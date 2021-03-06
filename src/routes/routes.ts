import * as express from 'express';
import {Response, Request} from 'express';
import * as bodyParser from 'body-parser';
import {StateService} from '../services/state/state-service';
import {RouteService} from '../services/route/route-service';
import {ResponseService} from '../services/response/response-service';
import {PortsService} from '../services/port/ports-service';
import {IRoute} from '../state-manager/route.model';
import {IResponse} from '../state-manager/response.model';

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
      })
      .post((req: Request, res: Response) => {
        try {
          this.stateService.createState(req.body);
          res.status(200).send();
        } catch (e) {
          res.status(403).send();
        }
      });
    // Ports API
    app.route('/api/ports/')
      .get((req: Request, res: Response) => {
        const ports = this.stateService.getPorts();
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
        const port = this.stateService.getPort(req.params.id);

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
    app.route('/api/ports/:portId/routes')
        .get((req: Request, res: Response) => {
          const routes = this.routeService.getAllByPortId(req.params.portId);
          res.status(200).send(routes);
        })
        .post((req: Request, res: Response) => {
          const inputRoute: IRoute = req.body;

          try {
            this.routeService.createRoute(req.params.portId, inputRoute);
            res.status(200).send();
          } catch (e) {
            res.status(403).send(e);
          }
        });

    app.route('/api/ports/:portId/routes/:id')
      .get((req: Request, res: Response) => {
         const route = this.routeService.get(req.params.portId, req.params.id);
         res.status(200).send(route);
      })
      .post((req: Request, res: Response) => {
        res.status(200).send();
      })
      .put((req: Request, res: Response) => {
        const inputRoute = req.body;
        this.routeService.update(req.params.portId, req.params.id, inputRoute);
        res.status(200).send();
      })
      .delete((req: Request, res: Response) => {
        this.routeService.remove(req.params.portId, req.params.id);
        res.status(200).send();
      });

    // Response API
    app.route('/api/ports/:portId/routes/:routeId/responses/:id')
      .get((req: Request, res: Response) => {
        const response: IResponse = this.stateService.getResponse(req.params.portId, req.params.routeId, req.params.id);
        if (response) {
          res.status(200).send(response);
        } else {
          res.status(404).send();
        }
      })
      .post((req: Request, res: Response) => {
        try {
          this.stateService.createResponse(req.params.portId, req.params.routeId, req.body);
          res.status(200).send();
        } catch (e) {
          res.status(404).send();
        }
      })
      .put((req: Request, res: Response) => {
        this.stateService.updateResponse(req.params.portId, req.params.routeId, req.params.id, req.body);
        res.status(200).send();
      })
      .delete((req: Request, res: Response) => {
        this.stateService.removeResponse(req.params.portId, req.params.routeId, req.params.Id);
        res.status(200).send();
      });
  }
}