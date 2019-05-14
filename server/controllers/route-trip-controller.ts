import {RouteStop, RouteStopDBRow, RouteTripDataResponse} from '../models/route-trip-data';
import * as mysql from 'mysql';
import { ServerSettingsController } from './server-settings-controller';

export class RouteTripController {
  constructor() { }

  public async getRouteTripData(routeid: string, direction: string, stopid: string, departuretime: string): Promise<RouteTripDataResponse> {
    const settings = ServerSettingsController.getServerConfig();

    const con = mysql.createConnection({
      host: 'localhost',
      user: settings.mysqlUsername,
      password: settings.mysqlPassword,
      database: settings.mysqlDatabase
    });

    con.connect(err => {
      if(err) {
        return;
      }
    });

    let result: RouteTripDataResponse = null;

    const query = new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM Stop_Times WHERE day_id=? AND route_num=? AND direction=? AND " +
        "trip_id=(SELECT trip_id FROM Stop_Times WHERE day_id=? AND route_num=? AND direction=? " +
        "AND stop_num=? AND departure_time=?);",
        ['y103p', routeid, direction, 'y103p', routeid, direction, stopid, departuretime],
        (err, rows: RouteStopDBRow[]) => {
          if (err) reject();
          let stops: RouteStop[] = [];

          if(rows.length == 0) {
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

          rows.forEach(row => {
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
