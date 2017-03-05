import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IResponse} from '../../state-manager/response.model';

export class ResponseService {
  private readonly activityManager = ActivityManager.getInstance();
  private readonly stateManager = StateManager.getInstance();
  private readonly DEFAULT_RESPONSE = {
    status: 200,
    delay: 0,
    active: false
  };

  get(portId: string, routeId: string, responseId: string): IResponse {
    return this.stateManager.getResponse(portId, routeId, responseId);
  }

  create(portId: string, routeId: string, response: IResponse) {
    this.stateManager.addResponse(
      portId,
      routeId,
      Object.assign({}, this.DEFAULT_RESPONSE, response)
    );
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

