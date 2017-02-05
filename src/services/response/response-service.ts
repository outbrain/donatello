import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IResponse} from '../../state-manager/response.model';

class responseService {
  readonly activityManager = ActivityManager.getInstance();
  readonly stateManager = StateManager.getInstance();

  create(response: IResponse) {
    this.activityManager.stopActivities();
    this.stateManager.addResponse(response);
    this.activityManager.startActivities();
  }

  update(response: IResponse) {
    this.activityManager.stopActivities();
    this.stateManager.updateResponse(response);
    this.activityManager.startActivities();
  }

  remove(responseId: string) {
    this.activityManager.stopActivities();
    this.stateManager.removeResponse(responseId);
    this.activityManager.startActivities();
  }
}

