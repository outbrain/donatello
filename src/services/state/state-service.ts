import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IState} from '../../state-manager/state.model';
import {Response} from 'express';
import {PortsService} from '../port/ports-service';
import {RouteService} from '../route/route-service';
import {ResponseService} from '../response/response-service';
import {IPort} from '../../state-manager/port.model';
import {ValidationService} from '../validation/validation-service';
import * as winston from 'winston';

export class StateService {
  private readonly activityManager = ActivityManager.getInstance();
  private readonly stateManager = StateManager.getInstance();
  private readonly portService = new PortsService();
  private readonly routeService = new RouteService();
  private readonly responseService = new ResponseService();
  private readonly logger: winston.Winston = winston;
  private readonly validationService = new ValidationService();

  getState(): IState {
    return this.stateManager.getState();
  }

  // createPort(port: IPort, res: Response): void {
  //   this.activityManager.stopActivities();
  //   this.portService.create(port);
  //   this.activityManager.startActivities();
  //   res.status(200);
  // }
}