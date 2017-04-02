import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IState} from '../../state-manager/state.model';
import {PortsService} from '../port/ports-service';
import {RouteService} from '../route/route-service';
import {ResponseService} from '../response/response-service';
import {IPort} from '../../state-manager/port.model';
import {ValidationService} from '../validation/validation-service';
import * as winston from 'winston';

export class StateService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();
  private readonly portService = new PortsService();
  private readonly rosuteService = new RouteService();
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

  getPorts() {
    this.activityManager.stopActivities();
    this.portService.getAll();
    this.activityManager.startActivities();
  }

  getPort(portId: string) {
    this.activityManager.stopActivities();
    this.portService.get(portId);
    this.activityManager.startActivities();
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
}