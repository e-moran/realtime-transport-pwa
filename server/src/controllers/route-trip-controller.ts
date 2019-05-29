import { RouteStop, RouteTripDataResponse } from '../models/route-trip-data';
import { MySQLService } from '../models/mysql-service';

export class RouteTripController {
  static dateMapping= ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  constructor() { }

  public async getRouteTripData(routeid: string, direction: string, stopid: string, departuretime: string, agencyName: string): Promise<RouteTripDataResponse> {
    return new MySQLService().routeTripQuery(routeid, direction, stopid, departuretime, RouteTripController.dateMapping[new Date().getDay()], RouteTripController.getAgencyID(agencyName)).then(rows => {
      let stops: RouteStop[] = [];

      rows.forEach(row => {
        stops.push({
          id: row.stop_id,
          name: row.stop_name,
          num: row.stop_num,
          time: row.departure_time,
          sequence: row.stop_sequence,
          stop_lat: row.stop_lat,
          stop_lon: row.stop_lon
        });
      });

      return {
        status: 0,
        timestamp: new Date().toISOString(),
        result: {
          stops: stops
        }
      };
    }).catch(err => {
      let status = 1;

      if(err != 0)
        status = 2;

      return {
        status: status,
        timestamp: new Date().toISOString(),
        result: null
      }
    });
  }

  private static getAgencyID(agencyName: string) {
    let agencyMap = new Map();
    agencyMap.set('bac', '978');
    agencyMap.set('nightlink', 'NTLK');
    agencyMap.set('BE', '01');
    agencyMap.set('GAD', '03');

    return agencyMap.get(agencyName);
  }
}
