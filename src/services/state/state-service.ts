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
<<<<<<< HEAD
  private readonly logger: winston.Winston = winston;
=======
  private readonly logger: winston.Winston = winston; 
>>>>>>> bd0497a2c97d3307e6039bc2e3e0c4110c9d1011
  private readonly validationService = new ValidationService();

  getState(): IState {
    return this.stateManager.getState();
  }

<<<<<<< HEAD
  // createPort(port: IPort, res: Response): void {
  //   this.activityManager.stopActivities();
  //   this.portService.create(port);
  //   this.activityManager.startActivities();
  //   res.status(200);
  // }
=======
  createPort(port: IPort, res: Response): void {
    this.activityManager.stopActivities();
    this.portService.create(port);
    this.activityManager.startActivities();
    res.status(200);
  }
>>>>>>> bd0497a2c97d3307e6039bc2e3e0c4110c9d1011
}