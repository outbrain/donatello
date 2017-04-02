import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IState} from '../../state-manager/state.model';
import {PortsService} from '../port/ports-service';
import {RouteService} from '../route/route-service';
import {ResponseService} from '../response/response-service';
import {IPort} from '../../state-manager/port.model';
import {ValidationService} from '../validation/validation-service';
import * as winston from 'winston';
import {IResponse} from '../../state-manager/response.model';
import {IRoute} from '../../state-manager/route.model';

export class StateService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();
  private readonly portService = new PortsService();
  private readonly rosuteService = new RouteService();
  private readonly responseService = new ResponseService();
  private readonly logger: winston.Winston = winston;
  private readonly validationService = new ValidationService();

  createState(state: IState) {
    //todo: add validations
    this.activityManager.stopActivities();
    const currentState: IState = this.stateManager.getState();
    currentState.ports.length = 0;

    state.ports.forEach((port: IPort) => {
      this.createPort(port);
      port.routes.forEach((route: IRoute) => {
        //this.createRoute(route);
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

  getPorts() {
    return this.portService.getAll();
  }

  getPort(portId: string) {
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

  getResponse(portId: string, routeId: string, responseId: string): IResponse {
    const port: IPort = this.getPort(portId);

    if(!port) {
      const errorMsg = `port with id ${portId} does not exist`;
      this.logger.error(errorMsg);
      throw errorMsg;
    }

    const route: IRoute = port.routes.find((route) => route.id === routeId);

    if(!route) {
      const errorMsg = `route with id ${routeId} does not exist`;
      this.logger.error(errorMsg);
      throw errorMsg;
    }

    return route.responses.find((response) => response.id === responseId);
  }

  createResponse(portId: string, routeId: string, response: IResponse) {
    this.activityManager.stopActivities();
    this.responseService.create(portId, routeId, response);
    this.activityManager.startActivities();
  }

  updateResponse(portId: string, routeId: string, responseId: string, newResponse: IResponse) {
    this.activityManager.stopActivities();
    Object.assign(this.getResponse(portId, routeId, responseId), newResponse);
    this.activityManager.startActivities();
  }

  // removeResponse(portId: string, routeId: string, responseId: string) {
  //   this.activityManager.stopActivities();
  //   const route: IRoute = this.getRoute(portId, routeId);
  //   const responseIndex: number = route.responses.findIndex((response: IResponse) => response.id === responseId);
  //   route.responses.splice(responseIndex, 1);
  //   this.activityManager.startActivities();
  // }
}