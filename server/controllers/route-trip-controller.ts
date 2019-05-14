import {RouteStop, RouteTripDataResponse} from '../models/route-trip-data';
import * as mysql from 'mysql';
import { ServerSettingsController } from './server-settings-controller';

export class RouteTripController {
  static dateMapping= ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  constructor() { }

  public async getRouteTripData(routeid: string, direction: string, stopid: string, departuretime: string): Promise<RouteTripDataResponse> {
    const settings = ServerSettingsController.getServerConfig();

    const con = mysql.createConnection({
      host: 'localhost',
      user: settings.mysqlUsername,
      password: settings.mysqlPassword,
      database: settings.mysqlDatabase,
      multipleStatements: true
    });

    con.connect(err => {
      if(err) {
        return;
      }
    });

    let result: RouteTripDataResponse = null;
    const day = RouteTripController.dateMapping[new Date().getDay()];

    const query = new Promise((resolve, reject) => {
      con.query(
        "SELECT @day_id := days_id FROM Days WHERE " + day + "=1 LIMIT 1; SELECT * FROM Stop_Times WHERE day_id=@day_id AND route_num=? AND direction=? AND " +
        "trip_id=(SELECT trip_id FROM Stop_Times WHERE day_id=@day_id AND route_num=? AND direction=? " +
        "AND stop_num=? AND departure_time=?);",
        [routeid, direction, routeid, direction, stopid, departuretime],
        (err, rows) => {
          console.log(rows);
          if (err) reject();
          let stops: RouteStop[] = [];

          if(rows[1].length == 0) {
            result = {
              status: 1,
              timestamp: '',
              result: {
                stops: []
              }
            };

            resolve();
            return;
          }

          rows[1].forEach(row => {
            stops.push({
              id: row.stop_id,
              num: row.stop_num,
              time: row.departure_time
            });
          });

          result =  {
            status: 0,
            timestamp: '',
            result: {
              stops: stops
            }
          } as RouteTripDataResponse;

          resolve();
        }
      );
    });

    await query;

    con.end(() => { });

    return result;
  }
}
