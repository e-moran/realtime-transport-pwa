import { RTPITripCombiResponse, RTPITripCombiData } from '../models/rtpi-trip-combi-data';
import { StopRTPIController } from './stop-rtpi-controller';
import { RouteTripController } from './route-trip-controller';

export class RTPITripCombiController {
  constructor() {}

  public async getCombiData(stopid: string): Promise<RTPITripCombiResponse> {
    let routeTripController = new RouteTripController();
    let result: RTPITripCombiData[] = [];

    const query = new Promise((resolve) => {

      new StopRTPIController().getStopRTPIData(stopid).then( res => {

        let tripPromises: Promise<void>[] = [];

        res.results.forEach(rtpiBus => {
          tripPromises.push(routeTripController.getRouteTripData(rtpiBus.route, rtpiBus.direction, stopid, rtpiBus.scheduledDepartureDateTime.split(' ')[1]).then(data => {
            result.push({
              rtpiinfo: rtpiBus,
              tripdata: data.result
            });
          }));
        });

        Promise.all(tripPromises).then( () => {
          resolve();
        });
      });
    });

    await query;

    return {
      status: 0,
      timestamp: '',
      result: result
    };
  }
}
