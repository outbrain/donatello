import {IPort} from '../../state-manager/port.model';
import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IRoute} from '../../state-manager/route.model';
import {RouteService} from '../route/route-service';

export class PortsService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();
  readonly routeService = new RouteService();

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
  }

  remove(portId :string) {
    this.activityManager.stopActivities();
    //this.stateManager.removePort(portId);
    this.activityManager.startActivities();
  }
}