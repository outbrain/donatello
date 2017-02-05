import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IRoute} from '../../state-manager/route.model';
import {IResponse} from '../../state-manager/response.model';

class routeService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();

  create(route :IRoute) {
    this.activityManager.stopActivities();
    this.stateManager.addRoute(route);
    route.responses.forEach((response :IResponse) => {
      this.stateManager.addResponse(respone);
    });
    this.activityManager.startActivities();
  }

  update(route :IRoute) {
    this.activityManager.stopActivities();
    this.stateManager.updateRoute(route);
    this.activityManager.startActivities();
  }

  remove(routeId :string) {
    this.activityManager.stopActivities();
    this.stateManager.removeRoute(routeId);
    this.activityManager.startActivities();
  }
}
