import * as express from 'express';
import {Routes} from './routes/routes';



class Server {
  readonly router = new Routes();
  readonly app: express.Application = express();

  constructor() {
    this.router.init(this.app);
    this.app.listen(3000, () => {
      console.log('Example app listening on port 3000!!!');
    });
  }
}

(() => {
  new Server();
})();

