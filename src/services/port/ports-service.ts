import {IPort} from '../../state-manager/port.model';
import {StateManager} from '../../state-manager/state-manager';
import {IRoute} from '../../state-manager/route.model';
import {RouteService} from '../route/route-service';
import * as winston from 'winston';
import {ActivityManager} from '../../activity-manager/activity-manager';

export class PortsService {
  private readonly stateManager = StateManager.getInstance();
  private readonly routeService = new RouteService();
  private readonly activityManager = new ActivityManager();
  private readonly logger: winston.Winston = winston;

  getAll(): IPort[] {
    return this.stateManager.getPorts();
  }

  get(portId: string): IPort {
    return this.stateManager.getPort(portId);
  }

  create(port: IPort) {
    this.stateManager.addPort(port);
    if (port.routes) {
      port.routes.forEach((route: IRoute) => {
       this.routeService.create(port.id, route);
      });
    }

    this.logger.info(`added new port with id: ${port.id} `);
  }

  update(portId: string, port :IPort) {
    //this.activityManager.stopActivities();
    this.stateManager.updatePort(portId, port);
    if (port.routes) {
      //this.stateManager.getRoute();
    }
    //this.activityManager.startActivities();
  }

  remove(portId: string) {
    //this.stateManager.removePort(portId);
  }
}