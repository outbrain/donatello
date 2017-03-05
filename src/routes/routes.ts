import * as express from 'express';
import {Response, Request} from 'express';
import * as bodyParser from 'body-parser';
import {StateService} from '../services/state/state-service';

export class Routes {
  private readonly stateService = new StateService();

  public init(app: express.Application) {
    app.use(bodyParser.json());

    app.route('/api/state/')
      .get((req: Request, res: Response) => {
        const state = this.stateService.get();
        res.status(200).send(state);
      });

    // Ports API
    app.route('/api/ports/')
      .post((req: Request, res: Response) => {
        this.stateService.createPort(req.body.port);
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