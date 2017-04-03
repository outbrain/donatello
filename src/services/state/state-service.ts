import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IState} from '../../state-manager/state.model';
import {PortsService} from '../port/ports-service';
import {RouteService} from '../route/route-service';
import {ResponseService} from '../response/response-service';
import {IPort} from '../../state-manager/port.model';
import {ValidationService} from '../validation/validation-service';
import * as winston from 'winston';
import {IRoute} from '../../state-manager/route.model';
import {IResponse} from '../../state-manager/response.model';

export class StateService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();
  private readonly portService = new PortsService();
  private readonly routeService = new RouteService();
  private readonly responseService = new ResponseService();
  private readonly logger: winston.Winston = winston;
  private readonly validationService = new ValidationService();

  createState(state: IState) {
    this.activityManager.stopActivities();
    const currentState: IState = this.stateManager.getState();
    currentState.ports.length = 0;

    state.ports.forEach((port: IPort) => {
      this.createPort(port);
      port.routes.forEach((route: IRoute) => {
        this.routeService.createRoute(port.id, route);
        route.responses.forEach((response: IResponse) => {
          this.createResponse(port.id, route.id, response);
        });
      });
    });

    this.activityManager.startActivities();
  }

  createPort(port: IPort): void {
    this.activityManager.stopActivities();
    this.portService.create(port);
    this.activityManager.startActivities();
  }

  getState(): IState {
    return this.stateManager.getState();
  }

  getPorts(): IPort[] {
    return this.portService.getAll();
  }

  getPort(portId: string): IPort {
    return this.portService.get(portId);
  }

  updatePort(portId: string, newPort: IPort) {
    this.activityManager.stopActivities();
    this.portService.update(portId, newPort);
    this.activityManager.startActivities();
  }

  removePort(portId: string) {
    this.activityManager.stopActivities();
    this.portService.remove(portId);
    this.activityManager.startActivities();
  }

  createRoute(portId: string, inputRoute: IRoute) {
    this.activityManager.stopActivities();
    this.routeService.createRoute(portId, inputRoute);
    this.activityManager.startActivities();
  }

  getRoutes(portId: string) :IRoute[] {
    return this.routeService.getAllByPortId(portId);
  }

  getRoute(portId: string, routeId: string): IRoute {
    return this.routeService.get(portId, routeId);
  }

  updateRoute(portId: string, routeId: string, route: IRoute) {
    this.activityManager.stopActivities();
    this.routeService.update(portId, routeId, route);
    this.activityManager.startActivities();
  }

  removeRoute(portId: string, routeId: string) {
    this.activityManager.stopActivities();
    this.routeService.remove(portId, routeId);
    this.activityManager.startActivities();
  }

  getResponse(portId: string, routeId: string, responseId: string): IResponse {
    return this.responseService.get(portId, routeId, responseId);
  }

  createResponse(portId: string, routeId: string, response: IResponse) {
    this.activityManager.stopActivities();
    this.responseService.create(portId, routeId, response);
    this.activityManager.startActivities();
  }

  updateResponse(portId: string, routeId: string, responseId: string, newResponse: IResponse) {
    this.activityManager.stopActivities();
    this.responseService.update(portId, routeId, responseId, newResponse);
    this.activityManager.startActivities();
  }

  activateResponse(portId: string, routeId: string, responseId: string) {
    this.responseService.activateResponse(portId, routeId, responseId);
  }

  deactivateResponse(portId: string, routeId: string, responseId: string) {
    this.responseService.deactivateResponse(portId, routeId, responseId);
  }

  removeResponse(portId: string, routeId: string, responseId: string) {
    this.activityManager.stopActivities();
    this.responseService.remove(portId, routeId, responseId);
    this.activityManager.startActivities();
  }
}