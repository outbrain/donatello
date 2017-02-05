import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IResponse} from '../../state-manager/response.model';

export class ResponseService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();

  create(portId: string, routeId: string, response: IResponse) {
    this.stateManager.addResponse(portId, routeId, response);
  }

  update(response: IResponse) {
    this.activityManager.stopActivities();
    //this.stateManager.updateResponse(response);
    this.activityManager.startActivities();
  }

  remove(responseId: string) {
    this.activityManager.stopActivities();
    //this.stateManager.removeResponse(responseId);
    this.activityManager.startActivities();
  }
}

