import * as express from 'express';
import * as winston from 'winston';
import {Routes} from './routes/routes';

class Server {
  readonly router = new Routes();
  readonly app: express.Application = express();
  private readonly logger: winston.Winston = winston;

  constructor() {
    this.router.init(this.app);
    this.app.listen(3000, () => {
      this.logger.info('Example app listening on port 3000!!!');
    });
  }
}

(() => {
  new Server();
})();

