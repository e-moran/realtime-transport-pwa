import { Request, Response } from 'express';
import { StopRTPIController } from '../controllers/stop-rtpi-controller';
import {RouteTripController} from "../controllers/route-trip-controller";

export class Routes {
  public routes(app): void {
    app.route('/api/ping')
      .get((req: Request, res: Response) => {
        res.send('Pong');
      });
    app.route('/api/stoprtpi/:stopid')
      .get((req: Request, res: Response) => {
        const stopRTPIController = new StopRTPIController();
        stopRTPIController.getStopRTPIData(req).then(data => {
          res.json(data);
        })
      });
    app.route('/api/routestops/:stopid/:routeid/:direction/:departuretime')
      .get((req: Request, res: Response) => {
        new RouteTripController().getRouteTripData(req).then(data => {
          res.json(data);
        });
      });
  }
}
