import {IPort} from '../../state-manager/port.model';
import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IRoute} from '../../state-manager/route.model';
import {RouteService} from '../route/route-service';

export class PortsService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();
  readonly routeService = new RouteService();

  create(port :IPort) {
    this.activityManager.stopActivities();
    this.stateManager.addPort(port);
    port.routes.forEach((route :IRoute) => {
      this.routeService.create(port.id, route);
    });
    this.activityManager.startActivities();
  }

  update(port :IPort) {
    this.activityManager.stopActivities();
    //this.stateManager.updatePort(port);
    this.activityManager.startActivities();
  }

  remove(portId :string) {
    this.activityManager.stopActivities();
    //this.stateManager.removePort(portId);
    this.activityManager.startActivities();
  }
}