import * as express from 'express';
import {Response, Request} from 'express';
import * as bodyParser from 'body-parser';
import {StateService} from '../services/state/state-service';
<<<<<<< HEAD
import {RouteService} from '../services/route/route-service';
=======
import {RouteService} from '../../dist/services/route/route-service';
>>>>>>> bd0497a2c97d3307e6039bc2e3e0c4110c9d1011
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
        this.portsService.create(inputPort, res);
        res.send();
<<<<<<< HEAD
      });

=======
      })
      
>>>>>>> bd0497a2c97d3307e6039bc2e3e0c4110c9d1011
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
        this.portsService.update(req.params.id, req.body);
        res.status(200).send();
      })
      .delete((req: Request, res: Response) => {
        res.status(200).send();
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