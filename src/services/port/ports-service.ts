import {IPort} from '../../state-manager/port.model';
import {StateManager} from '../../state-manager/state-manager';
import {IRoute} from '../../state-manager/route.model';
import {RouteService} from '../route/route-service';
import * as winston from 'winston';

export class PortsService {
  private readonly stateManager = StateManager.getInstance();
  private readonly routeService = new RouteService();
  private readonly logger: winston.Winston = winston;

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