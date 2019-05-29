import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import { Routes } from './routes/api-routes';

class App {
  public app: express.Application;
  public apiRoutes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    // support application/json type post data
    this.app.use(bodyParser.json());
    this.app.use(compression());

    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.apiRoutes.routes(this.app);
    this.app.use(express.static(path.join(__dirname, '../../dist/dublinbus-app')));
    this.app.all('/*', (req, res) => {
      // Just send the index.html for other files to support HTML5Mode
      console.log(req);
      res.sendFile('index.html', { root: __dirname + '/../../dist/dublinbus-app'});
    });
  }
}

export default new App().app;
