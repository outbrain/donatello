import * as express from 'express';
import {Request, Response} from 'express';
import {StateManager} from '../state-manager/state-manager';
import {IResponse} from '../state-manager/response.model';
import {Server} from 'http';
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
        const app = this.createListener(port);
        port.routes.forEach((route) => {
          (<any>app)[route.method.toLowerCase()](route.path, (req: Request, res: Response) => {
            this.handleResponse(route.responses, port.proxy, req, res);
          });
        });
      })
  }

  private createListener(port: IPort): express.Application {
    const app: express.Application = express();
    const listener = app.listen(port.number, () => {
      console.log(`start listening ${port.name} on ${port.number}`);
    });
    this.listeners.push(listener);

    return app;
  }

  private handleResponse(responses: IResponse[], proxy: any, req: Request, res: Response) {
    const activeResponse = responses.find(item => item.active);
    res.status(activeResponse.status).send(activeResponse.data);
  }

  stopActivities() {
    while (this.listeners.length) {
      this.listeners[0].close();
      this.listeners.shift();
    }
  }
}