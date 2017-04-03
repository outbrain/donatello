import * as express from 'express';
import {Request, Response} from 'express';
import * as request from 'request';
import * as winston from 'winston';
import {StateManager} from '../state-manager/state-manager';
import {IResponse} from '../state-manager/response.model';
import {Server} from 'http';
import {IPort} from '../state-manager/port.model';

export class ActivityManager {
  private static instance: ActivityManager;
  private readonly stateManager = StateManager.getInstance();
  private readonly listeners: Server[] = [];
  private readonly logger: winston.Winston = winston;

  public static getInstance() {
    return ActivityManager.instance || (ActivityManager.instance = new ActivityManager());
  }

  startActivities() {
    const state = this.stateManager.getState();
    state.ports
      .filter(port => port.active)
      .forEach((port) => {
        const app = this.createListener(port);
        port.routes.filter(router => router.active).forEach((route) => {
          (<any>app)[route.method.toLowerCase()](route.path, (req: Request, res: Response) => {
            this.handleResponse(route.responses, req, res);
          });
        });

        if (port.proxy) {
          app.use((req: Request, res: Response) => {
            this.logger.info(`proxing ${port.name} on ${port.number}`);
            request(port.proxy.url).pipe(res);
          });
        }
      });
  }

  stopActivities() {
    while (this.listeners.length) {
      this.listeners[0].close();
      this.listeners.shift();
    }

    this.logger.info('closing all listening ports..');
  }

  private createListener(port: IPort): express.Application {
    const app: express.Application = express();
    const listener = app.listen(port.number, () => {
      this.logger.info(`start listening ${port.name} on ${port.number}`);
    });

    this.listeners.push(listener);
    return app;
  }

  private handleResponse(responses: IResponse[], req: Request, res: Response) {
    const activeResponse = responses.find(item => item.active);
    setTimeout(() => {
      res.status(activeResponse.status).send(activeResponse.data);
    }, activeResponse.delay);
  }
}