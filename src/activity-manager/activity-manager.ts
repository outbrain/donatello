import * as express from 'express';
import {StateManager} from '../state-manager/state-manager';
import {IResponse} from '../state-manager/response.model';
import Request = express.Request;
import Response = express.Response;
import {Server} from 'http';
import {listeners} from 'cluster';
import {IPort} from '../state-manager/port.model';

export class ActivityManager {
  private static instance: ActivityManager;
  private readonly stateManager = StateManager.getInstance();
  private readonly listeners: Server[] = [];

  public static getInstance() {
    return ActivityManager.instance || (ActivityManager.instance = new ActivityManager());
  }

  startActivities() {
    const state = this.stateManager.getState();
    state.ports
      .filter(port => port.active)
      .forEach((port) => {
        const app = this.createListner(port);
        port.routes.forEach((route) => {
          app[route.method.toLowerCase()].apply(null, this.handleResponse.bind(this, route.responses, port.proxy));
        });
      })
  }

  private createListner(port: IPort): express.Application {
    const app: express.Application = express();
    const listener = app.listen(port.number, () => {
      console.log(`start listening ${port.name} on ${port.number}`);
    });
    this.listeners.push(listener);

    return app;
  }

  private handleResponse(responses: IResponse[], proxy, req: Request, res: Response) {
    const activeResponse = responses.filter(item => item.active)[0];
    res.send(activeResponse.data);
  }

  stopActivities() {
    while (this.listeners.length) {
      this.listeners[0].close();
      this.listeners.shift();
    }
  }
}