import {IPort} from '../../state-manager/port.model';
import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IRoute} from '../../state-manager/route.model';

class PortService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();

  create(port :IPort) {
    this.activityManager.stopActivities();
    this.stateManager.addPort(port);
    port.routes.forEach((route :IRoute) => {
      this.stateManager.addRoute(route);
    });
    this.activityManager.startActivities();
  }

  update(port :IPort) {
    this.activityManager.stopActivities();
    this.stateManager.updatePort(port);
    this.activityManager.startActivities();
  }

  remove(portId :string) {
    this.activityManager.stopActivities();
    this.stateManager.removePort(portId);
    this.activityManager.startActivities();
  }
}