import { Request, Response } from 'express';
import { StopRTPIController } from '../controllers/stop-rtpi-controller';
import {RouteTripController} from "../controllers/route-trip-controller";
import {RTPITripCombiController} from '../controllers/rtpi-trip-combi-controller';
import { StopInfoController } from '../controllers/stop-info-controller';
import { StopSearchController } from '../controllers/stop-search-controller';

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
    app.route('/api/routestops/:stopid/:routeid/:direction/:departuretime/:agencyname')
      .get((req: Request, res: Response) => {
        new RouteTripController().getRouteTripData(req.params.routeid, req.params.direction, req.params.stopid, req.params.departuretime, req.params.agencyname).then(data => {
          res.json(data);
        });
      });

    // Returns the RTPI information for a stop and all associated data
    app.route('/api/rtpitripcombi/:stopid')
      .get((req: Request, res: Response) => {
        new RTPITripCombiController().getCombiData(req.params.stopid).then(data => {
          res.json(data);
        })
      });

    app.route('/api/stopinfo/:stopnum')
      .get((req: Request, res: Response) => {
        new StopInfoController().getStopInfo(req.params.stopnum).then( data => {
          res.json(data);
        })
      });

    app.route('/api/stopsearch/:term')
      .get((req: Request, res: Response) => {
        new StopSearchController().searchForStops(req.params.term).then(data => {
          res.json(data);
        });
      })
  }
}
