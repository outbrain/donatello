import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IRoute} from '../../state-manager/route.model';
import {IResponse} from '../../state-manager/response.model';
import {ResponseService} from '../response/response-service';

export class RouteService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();
  readonly responseService = new ResponseService();
  

  create(portId: string, route: IRoute) {
    this.stateManager.addRoute(portId, route);
    route.responses.forEach((response) => {
      this.responseService.create(portId, route.id, response);
    });
  }

  update(route: IRoute) {
    this.activityManager.stopActivities();
    //this.stateManager.updateRoute(route);
    this.activityManager.startActivities();
  }

  remove(routeId: string) {
    this.activityManager.stopActivities();
    //this.stateManager.removeRoute(routeId);
    this.activityManager.startActivities();
  }
}
