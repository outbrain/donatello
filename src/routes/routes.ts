import * as express from 'express';
import {Response, Request} from 'express';
import {StateManager} from '../state-manager/state-manager';
import {PortsService} from '../services/port/ports-service';
import * as bodyParser from 'body-parser';

export class Routes {
  readonly stateManager = StateManager.getInstance();
  readonly portsService = new PortsService();

  public init(app: express.Application) {
    app.use(bodyParser.json());

    // Ports API
    app.route('/api/ports/')
      .post((req: Request, res: Response) => {
        this.portsService.create(req.body.port);
        res.status(200).send();
      });

    app.route('/api/ports/:id')
      .put((req: Request, res: Response) => {
        res.status(200).send();
      })
      .delete((req: Request, res: Response) => {
        res.status(200).send();
      });

    app.route('/api/ports:id?')
      .get((req: Request, res: Response) => {
        res.status(200).send();
      });

    // Route API
    app.route('/api/ports/:portId/routes/:id')
      .post((req: Request, res: Response) => {
        res.status(200).send();
      })
      .put((req: Request, res: Response) => {
        res.status(200).send();
      })
      .delete((req: Request, res: Response) => {
        res.status(200).send();
      })
      .get((req: Request, res: Response) => {
        res.status(200).send();
      });

    // Response API
    app.route('/api/ports/:portId/routes/:routeId/responses/:id')
      .post((req: Request, res: Response) => {
        res.status(200).send();
      })
      .put((req: Request, res: Response) => {
        res.status(200).send();
      })
      .delete((req: Request, res: Response) => {
        res.status(200).send();
      })
      .get((req: Request, res: Response) => {
        res.status(200).send();
      });
  }
}