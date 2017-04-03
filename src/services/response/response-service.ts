import {StateManager} from '../../state-manager/state-manager';
import {ActivityManager} from '../../activity-manager/activity-manager';
import {IResponse} from '../../state-manager/response.model';
import * as winston from 'winston';
import {IPort} from '../../state-manager/port.model';
import {IRoute} from '../../state-manager/route.model';

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

  get(portId: string, routeId: string, responseId: string) {
    const port: IPort = this.stateManager.getPort(portId);

    if (!port) {
      const errorMsg = `port with id ${portId} does not exist`;
      this.logger.error(errorMsg);
      throw errorMsg;
    }

    const route: IRoute = port.routes.find((route) => route.id === routeId);

    if (!route) {
      const errorMsg = `route with id ${routeId} does not exist`;
      this.logger.error(errorMsg);
      throw errorMsg;
    }

    return route.responses.find((response) => response.id === responseId);
  }

  update(portId: string, routeId: string, responseId: string, newResponse: IResponse) {
    Object.assign(this.get(portId, routeId, responseId), newResponse);
  }

  activateResponse(portId: string, routeId: string, responseId: string) {
    this.stateManager.activateResponse(portId, routeId, responseId);
  }

  deactivateResponse(portId: string, routeId: string, responseId: string) {
    this.stateManager.deactivateResponse(portId, routeId, responseId);
  }

  remove(portId: string, routeId: string, responseId: string) {
    const route: IRoute = this.stateManager.getRoute(portId, routeId);
    const responseIndex: number = route.responses.findIndex((response: IResponse) => response.id === responseId);
    route.responses.splice(responseIndex, 1);
  }
}

