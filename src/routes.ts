import * as express from 'express';

export class Routes {

  public init(app: express.Application) {
    app.route('/')
      .get((req, res) => {
        res.render('login', {
          title: 'Express Login'
        });
      });
  }
}