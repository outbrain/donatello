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
import * as _ from 'lodash';

export class StateService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();
  private readonly portService = new PortsService();
  private readonly routeService = new RouteService();
  private readonly responseService = new ResponseService();
  private readonly logger: winston.Winston = winston;
  private readonly validationService = new ValidationService();

  createState(state: IState): IState {
    this.activityManager.stopActivities();
    const currentState: IState = this.stateManager.getState();
    currentState.ports = [];

    state.ports.forEach((port: IPort) => {
      this.createPort(port);
    });

    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }

  createPort(port: IPort): IState {
    this.activityManager.stopActivities();
    this.portService.create(_.cloneDeep(port));
    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }

  getState(): IState {
    return _.cloneDeep(this.stateManager.getState());
  }

  getPorts(): IPort[] {
    return _.cloneDeep(this.portService.getAll());
  }

  getPort(portId: string): IPort {
    return _.cloneDeep(this.portService.get(portId));
  }

  updatePort(portId: string, newPort: IPort): IState {
    this.activityManager.stopActivities();
    this.portService.update(portId, _.cloneDeep(newPort));
    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }

  removePort(portId: string): IState {
    this.activityManager.stopActivities();
    this.portService.remove(portId);
    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }

  createRoute(portId: string, inputRoute: IRoute): IState {
    this.activityManager.stopActivities();
    this.routeService.createRoute(portId, _.cloneDeep(inputRoute));
    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }

  getRoutes(portId: string): IRoute[] {
    return _.cloneDeep(this.routeService.getAllByPortId(portId));
  }

  getRoute(portId: string, routeId: string): IRoute {
    return _.cloneDeep(this.routeService.get(portId, routeId));
  }

  updateRoute(portId: string, routeId: string, route: IRoute): IState {
    this.activityManager.stopActivities();
    this.routeService.update(portId, routeId, _.cloneDeep(route));
    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }

  removeRoute(portId: string, routeId: string): IState {
    this.activityManager.stopActivities();
    this.routeService.remove(portId, routeId);
    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }

  getResponse(portId: string, routeId: string, responseId: string): IResponse {
    return _.cloneDeep(this.responseService.get(portId, routeId, responseId));
  }

  createResponse(portId: string, routeId: string, response: IResponse): IState {
    this.activityManager.stopActivities();
    this.responseService.create(portId, routeId, _.cloneDeep(response));
    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }

  updateResponse(portId: string, routeId: string, responseId: string, newResponse: IResponse): IState {
    this.activityManager.stopActivities();
    this.responseService.update(portId, routeId, responseId, _.cloneDeep(newResponse));
    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }

  activateResponse(portId: string, routeId: string, responseId: string) {
    this.responseService.activateResponse(portId, routeId, responseId);
    return _.cloneDeep(this.stateManager.getState());
  }

  deactivateResponse(portId: string, routeId: string, responseId: string) {
    this.responseService.deactivateResponse(portId, routeId, responseId);
    return _.cloneDeep(this.stateManager.getState());
  }

  removeResponse(portId: string, routeId: string, responseId: string): IState {
  activateRoute(portId: string, routeId: string) {
    this.routeService.activateRoute(portId, routeId);
  }

  deactivateRoute(portId: string, routeId: string) {
    this.routeService.deactivateRoute(portId, routeId);
  }

  removeResponse(portId: string, routeId: string, responseId: string) {
    this.activityManager.stopActivities();
    this.responseService.remove(portId, routeId, responseId);
    this.activityManager.startActivities();
    return _.cloneDeep(this.stateManager.getState());
  }
}