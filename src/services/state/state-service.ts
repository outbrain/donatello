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

export class StateService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();
  private readonly portService = new PortsService();
  private readonly routeService = new RouteService();
  private readonly responseService = new ResponseService();
  private readonly logger: winston.Winston = winston;
  private readonly validationService = new ValidationService();

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

  createRoutes(portId: string, inputRoute: IRoute) {
    this.activityManager.stopActivities();
    return this.routeService.createRoute(portId, inputRoute);
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
    return this.routeService.update(portId, routeId, route);
    this.activityManager.startActivities();
  }

  removeRoute(portId: string, routeId: string) {
    this.activityManager.stopActivities();
    return this.routeService.remove(portId, routeId);
    this.activityManager.startActivities();
  }
}