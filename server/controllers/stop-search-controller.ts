import { StopSearchResponse } from '../models/stop-search-data';
import { ServerSettingsController } from './server-settings-controller';
import * as mysql from 'mysql';
import { StopInfo } from '../models/stop-info-data';

export class StopSearchController {
  constructor() {}

  public async searchForStops(term: string): Promise<StopSearchResponse> {
    const settings = ServerSettingsController.getServerConfig();

    const con = mysql.createConnection({
      host: 'localhost',
      user: settings.mysqlUsername,
      password: settings.mysqlPassword,
      database: settings.mysqlDatabase,
    });

    let result: StopSearchResponse = null;

    const sql_name = 'SELECT *, (stop_id LIKE \'%DB%\') AS is_dublinbus FROM stops WHERE MATCH(stop_name) AGAINST(?) AND stop_num != 0 LIMIT 10;';
    const sql_num = 'SELECT *, (stop_id LIKE \'%DB%\') AS is_dublinbus FROM stops WHERE stop_num=? LIMIT 10 AND stop_num != 0;';
    let sql = '';

    if(isNaN(+term)) {
      sql = sql_name;
    } else {
      sql = sql_num;
    }


    const query = new Promise((resolve, reject) => {
      con.query(sql, [term, term], (err, rows) => {
        if (err) reject();

        if(rows.length == 0) {
          result = {
            status: 1,
            timestamp: new Date().toISOString(),
            stops: null
          };

          resolve();
          return;
        }

        let stops: StopInfo[] = [];

        rows.forEach(row => {
          stops.push({
            stop_name: row['stop_name'],
            stop_num: row['stop_num'],
            stop_lat: row['stop_lat'],
            stop_lon: row['stop_lon'],
            is_dublinbus: row['is_dublinbus']
          })
        });

        result = {
          status: 0,
          timestamp: new Date().toISOString(),
          stops: stops
        };

        resolve();
      });
    });

    await query;

    con.end();

    return result;
  }
}
