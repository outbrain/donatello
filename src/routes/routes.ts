import * as express from 'express';
import {Response, Request} from 'express';
import * as bodyParser from 'body-parser';
import {StateService} from '../services/state/state-service';
import {RouteService} from '../services/route/route-service';
import {ResponseService} from '../services/response/response-service';
import {PortsService} from '../services/port/ports-service';

export class Routes {

  readonly portsService = new PortsService();
  readonly stateService = new StateService();
  readonly routeService = new RouteService();
  readonly responseService = new ResponseService();

  public init(app: express.Application) {
    app.use(bodyParser.json());

    app.route('/api/state/')
      .get((req: Request, res: Response) => {
        const state = this.stateService.getState();
        res.status(200).send(state);
      });

    // Ports API
    app.route('/api/ports/')
      .get((req: Request, res: Response) => {
        const ports = this.portsService.getAll();
        res.status(200).send(ports);
      })
      .post((req: Request, res: Response) => {
        const inputPort = req.body;

        try {
          this.stateService.createPort(inputPort);
          res.status(200).send();
        } catch (e) {
          res.status(403).send(e);
        }
      });

    app.route('/api/ports/:id')
      .get((req: Request, res: Response) => {
        const port = this.portsService.get(req.params.id);

        if (port) {
          res.status(200).send(port);
        } else {
          res.status(404).send();
        }
      })
      .put((req: Request, res: Response) => {
        try {
          this.stateService.updatePort(req.params.id, req.body);
          res.status(200).send();
        } catch (e) {
          res.status(403).send(e);
        }
      })
      .delete((req: Request, res: Response) => {
        try {
          this.stateService.removePort(req.params.id);
          res.status(200).send();
        } catch (e) {
          res.status(403).send(e);
        }
      });

    // Route API
    app.route('/api/ports/:portId/routes/:id')
      .get((req: Request, res: Response) => {
        // const route = this.routeService(req.params.portId, req.params.Id);
        // res.status(200).send(route);
      })
      .post((req: Request, res: Response) => {
        res.status(200).send();
      })
      .put((req: Request, res: Response) => {
        res.status(200).send();
      })
      .delete((req: Request, res: Response) => {
        res.status(200).send();
      });

    // Response API
    app.route('/api/ports/:portId/routes/:routeId/responses/:id')
      .get((req: Request, res: Response) => {
        // const response = this.responseService(req.params.portId, req.params.routeId, req.params.Id);
        // res.status(200).send(response);
      })
      .post((req: Request, res: Response) => {
        res.status(200).send();
      })
      .put((req: Request, res: Response) => {
        res.status(200).send();
      })
      .delete((req: Request, res: Response) => {
        res.status(200).send();
      });
  }
}