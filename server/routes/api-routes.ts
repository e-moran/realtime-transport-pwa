import { Request, Response } from 'express';
import { StopRTPIController } from '../controllers/stop-rtpi-controller';
import {RouteTripController} from "../controllers/route-trip-controller";

export class Routes {
  public routes(app): void {
    // Tests connection to the API
    app.route('/api/ping')
      .get((req: Request, res: Response) => {
        res.send('Pong');
      });
    // Returns the RTPI information for a stop from Dublin Bus' servers
    app.route('/api/stoprtpi/:stopid')
      .get((req: Request, res: Response) => {
        const stopRTPIController = new StopRTPIController();
        stopRTPIController.getStopRTPIData(req.params.stopid).then(data => {
          res.json(data);
        })
      });
    // Returns all the stops along a certain Dublin Bus route along with some basic information
    app.route('/api/routestops/:stopid/:routeid/:direction/:departuretime')
      .get((req: Request, res: Response) => {
        new RouteTripController().getRouteTripData(req.params.routeid, req.params.direction, req.params.stopid, req.params.departuretime).then(data => {
          res.json(data);
        });
      });
    // Returns the RTPI information for a stop and all associated data
    app.route('/api/stoprtpianddata')
  }
}
