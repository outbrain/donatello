import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IResponse} from '../../state-manager/response.model';
import * as winston from 'winston';

export class ResponseService {
  private readonly activityManager = ActivityManager.getInstance();
  private readonly stateManager = StateManager.getInstance();
  private readonly logger: winston.Winston = winston;

  private readonly DEFAULT_RESPONSE = {
    status: 200,
    delay: 0,
    active: false
  };

  create(portId: string, routeId: string, response: IResponse) {
    this.stateManager.addResponse(
      portId,
      routeId,
      Object.assign({}, this.DEFAULT_RESPONSE, response)
    );

    this.logger.info(`added new port with id: ${routeId}`);
  }
}

