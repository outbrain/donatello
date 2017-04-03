import {IPort} from '../../state-manager/port.model';
import {StateManager} from '../../state-manager/state-manager';
import {IRoute} from '../../state-manager/route.model';
import {RouteService} from '../route/route-service';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {ValidationService} from '../validation/validation-service';
import * as winston from 'winston';

export class PortsService {
  private readonly stateManager = StateManager.getInstance();
  private readonly routeService = new RouteService();
  private readonly activityManager = new ActivityManager();
  private readonly logger: winston.Winston = winston;
  private readonly validationService = new ValidationService();

  getAll(): IPort[] {
    return this.stateManager.getPorts();
  }

  get(portId: string): IPort {
    return this.stateManager.getPort(portId);
  }

  create(port: IPort) {
    if (!this.validationService.checkIfPortUnique(port, this.getAll())) {
      const errorMsg = 'port id or number must be unique!';
      this.logger.error(errorMsg);
      throw errorMsg;
    }

    this.stateManager.addPort(port);

    if (port.routes) {
      port.routes.forEach((route: IRoute) => {
        this.routeService.createRoute(port.id, route);
      });
    }

    this.logger.info(`added new port with id: ${port.id} `);
  }

  update(portId: string, newPort: IPort) {
    //this.activityManager.stopActivities();
    const port = this.get(portId);

    if(!port) {
      const errorMsg = `port with id ${portId} does not exist`;
      this.logger.error(errorMsg);
      throw errorMsg;
    }

    this.stateManager.updatePort(portId, newPort);
    if (newPort.routes) {
      //this.stateManager.getRoute();
    }
    //this.activityManager.startActivities();
  }

  remove(portId: string) {
    const port = this.get(portId);

    if(!port) {
      const errorMsg = `port with id ${portId} does not exist`;
      this.logger.error(errorMsg);
      throw errorMsg;
    }

    this.stateManager.removePort(portId);
  }
}