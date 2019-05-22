import { RouteStop, RouteTripDataResponse } from '../models/route-trip-data';
import * as mysql from 'mysql';
import { ServerSettingsController } from './server-settings-controller';

export class RouteTripController {
  static dateMapping= ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  constructor() { }

  public async getRouteTripData(routeid: string, direction: string, stopid: string, departuretime: string, agencyName: string): Promise<RouteTripDataResponse> {
    const settings = ServerSettingsController.getServerConfig();
    console.log(routeid + ' ' + direction + ' ' + stopid + ' ' + departuretime);

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
    
    const sql = 'SELECT * FROM stop_times' +
      '    JOIN stops ON stop_times.stop_id = stops.stop_id' +
      '    WHERE trip_id = (' +
      '        SELECT stop_times.trip_id' +
      '        FROM stop_times' +
      '                 JOIN trips ON stop_times.trip_id = trips.trip_id' +
      '                 JOIN calendar ON trips.service_id = calendar.service_id' +
      '                 JOIN routes ON trips.route_id = routes.route_id' +
      '                 JOIN stops ON stops.stop_id = stop_times.stop_id' +
      '        WHERE (route_short_name = ?' +
      '            OR route_long_name = ?)' +
      '          AND calendar.' + day + ' = 1' +
      '          AND trips.direction_id = ?' +
      '          AND agency_id = ?' +
      '          AND STR_TO_DATE(calendar.start_date, \'%Y%m%d\') <= NOW()' +
      '          AND STR_TO_DATE(calendar.end_date, \'%Y%m%d\') >= NOW()' +
      '          AND stop_num = ?' +
      '        ORDER BY ABS(TIMEDIFF(STR_TO_DATE(?, \'%H:%i:%s\'), departure_time))' +
      '        LIMIT 1' +
      '    );';

    const query = new Promise((resolve, reject) => {
      con.query(
        sql,
        [routeid, routeid, direction == 'O' ? 0 : 1, RouteTripController.getAgencyID(agencyName), stopid, departuretime],
        (err, rows) => {
          console.log(err);
          console.log(rows);
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
              name: row.stop_name,
              num: row.stop_num,
              time: row.departure_time,
              sequence: row.stop_sequence,
              stop_lat: row.stop_lat,
              stop_lon: row.stop_lon
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

  private static getAgencyID(agencyName: string) {
    let agencyMap = new Map();
    agencyMap.set('bac', '978');
    agencyMap.set('nightlink', 'NTLK');
    agencyMap.set('BE', '01');
    agencyMap.set('GAD', '03');

    return agencyMap.get(agencyName);
  }
}
