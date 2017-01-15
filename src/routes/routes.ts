import * as express from 'express';

export class Routes {

  public init(app: express.Application) {
    app.route('/')
      .get((req, res) => {
        res.render('login', {
          title: 'Express Login'
        });
      });

    //Ports API
    app.route('/api/ports')
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

    //Route API
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

    //Response API
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