import * as express from 'express';
import {Application, Request, Response, NextFunction, Router} from 'express';
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
  private readonly appsMap: Map<number, Application> = new Map();
  private readonly routesMap: Map<number, Router> = new Map();
  private readonly logger: winston.Winston = winston;

  public static getInstance() {
    return ActivityManager.instance || (ActivityManager.instance = new ActivityManager());
  }

  startActivities() {
    const state = this.stateManager.getState();
    state.ports
      .filter(port => port.active)
      .forEach((port) => {
        this.createListener(port);
        const router = express.Router();
        this.routesMap.set(port.number, router);

        if (port.routes) {
          port.routes.filter(router => router.active)
            .sort((item1, item2) => {
              if (item1.path < item2.path)
                return 1;
              if (item1.path > item2.path)
                return -1;
              return 0;
            })
            .forEach((route) => {
              const regexPath = new RegExp(route.path);
              (<any>router)[route.method.toLowerCase()](regexPath, (req: Request, res: Response) => {
                this.handleResponse(route.responses, req, res);
              });
            });
        }

        if (port.proxy) {
          this.logger.info(`proxing ${port.name} on ${port.number}`);
          ['get', 'post', 'put', 'delete', 'options'].forEach((method) => {
            (<any>router)[method]('*', (req: Request, res: Response) => {
              request(port.proxy.url + req.url).pipe(res);
            });
          })
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

  private createListener(port: IPort): Application {
    if (!this.appsMap.has(port.number)) {
      const app = express();
      this.appsMap.set(port.number, app);
    }

    const app = this.appsMap.get(port.number);

    app.use((req: Request, res: Response, next: NextFunction) => {
      const router = this.routesMap.get(port.number);
      router(req, res, next);
    });

    const listener = app.listen(port.number, () => {
      this.logger.info(`start listening ${port.name} on ${port.number}`);
    });

    this.listeners.push(listener);
    return this.appsMap.get(port.number);
  }

  private handleResponse(responses: IResponse[], req: Request, res: Response) {
    const activeResponse = responses.find(item => item.active);
    setTimeout(() => {
      res.status(activeResponse.status).send(activeResponse.data);
    }, activeResponse.delay);
  }
}