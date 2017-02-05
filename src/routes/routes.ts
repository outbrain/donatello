import * as express from 'express';
import {StateManager} from '../state-manager/state-manager';

export class Routes {
  readonly stateManager = StateManager.getInstance();

  public init(app: express.Application) {

    // Ports API
    app.route('/api/ports/')
      .post((req, res) => {

        res.status(200).send();
      });

    app.route('/api/ports/:id')
      .put((req, res) => {
        res.status(200).send();
      })
      .delete((req, res) => {
        res.status(200).send();
      });

    app.route('/api/ports:id?')
      .get((req, res) => {
        res.status(200).send();
      });

    // Route API
    app.route('/api/ports/:portId/routes/:id')
      .post((req, res) => {
        res.status(200).send();
      })
      .put((req, res) => {
        res.status(200).send();
      })
      .delete((req, res) => {
        res.status(200).send();
      })
      .get((req, res) => {
        res.status(200).send();
      });

    // Response API
    app.route('/api/ports/:portId/routes/:routeId/responses/:id')
      .post((req, res) => {
        res.status(200).send();
      })
      .put((req, res) => {
        res.status(200).send();
      })
      .delete((req, res) => {
        res.status(200).send();
      })
      .get((req, res) => {
        res.status(200).send();
      });
  }
}