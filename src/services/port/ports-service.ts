import {IPort} from '../../state-manager/port.model';
import {StateManager} from '../../state-manager/state-manager';
import {IRoute} from '../../state-manager/route.model';
import {RouteService} from '../route/route-service';
import * as winston from 'winston';

export class PortsService {
  private readonly stateManager = StateManager.getInstance();
  private readonly routeService = new RouteService();
  private readonly logger: winston.Winston = winston;
  
  get(portId: string): IPort {
    return this.stateManager.getPort(portId);
  }

  create(port :IPort) {
    this.activityManager.stopActivities();
    if (port.routes) {
      port.routes.forEach((route:IRoute) => {
        this.routeService.create(port.id, route);
      });
    }
    this.stateManager.addPort(port);
    this.activityManager.startActivities();
  }

  update(portId: string, port :IPort) {
    this.activityManager.stopActivities();
    // this.stateManager.getPort(portId) = port;
    // if (port.routes) {
    //   this.stateManager.getRoute()
    // }
    this.activityManager.startActivities();
  create(port: IPort) {
    this.stateManager.addPort(port);
    port.routes.forEach((route: IRoute) => {
      this.routeService.create(port.id, route);
    });
    
    this.logger.info(`added new port with id: ${port.id} `);
  }

  update(port: IPort) {
    //this.stateManager.updatePort(port);
  }

  remove(portId: string) {
    //this.stateManager.removePort(portId);
  }
}