import { ServerSettingsController } from '../controllers/server-settings-controller';
import * as mysql from 'mysql';
import { Connection, ConnectionConfig } from 'mysql';

export class MySQLService {
  private connection: Connection;

  constructor() {
    const settings = ServerSettingsController.getServerConfig();

    let config: ConnectionConfig = {
      host: settings.mysqlHost,
      user: settings.mysqlUsername,
      password: settings.mysqlPassword,
      database: settings.mysqlDatabase,
      multipleStatements: true
    };

    if(settings.socketPath != "") {
      config.socketPath = settings.socketPath;
    }

    this.connection = mysql.createConnection(config);
  }

  public async routeTripQuery(routeid: string, direction: string, stopid: string, departuretime: string, day: string, agencyId: string): Promise<any> {
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


    return this.executeQuery(sql, [routeid, routeid, direction == 'O' ? '0': '1', agencyId, stopid, departuretime]);
  }

  public async searchQuery(term: string): Promise<any> {
    const sql_name = 'SELECT *, (stop_id LIKE \'%DB%\') AS is_dublinbus FROM stops WHERE MATCH(stop_name) AGAINST(?) AND NOT stop_num = 0 LIMIT 10;';
    const sql_num = 'SELECT *, (stop_id LIKE \'%DB%\') AS is_dublinbus FROM stops WHERE stop_num=? AND NOT stop_num = 0 LIMIT 10;';
    let sql = '';

    if(isNaN(+term)) {
      sql = sql_name;
    } else {
      sql = sql_num;
    }

    return this.executeQuery(sql, [term]);
  }

  private async executeQuery(sql: string, params: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.connect( err => {
        if(err)
          reject(err);
        });

      this.connection.query(sql, params, (err, rows) => {
        if (err) reject(err);

        if(!rows) {
          reject(0);
        }

        if(rows.length == 0) {
          reject(0);
        }

        this.connection.end();

        resolve(rows);
      });
    });
  }
}
