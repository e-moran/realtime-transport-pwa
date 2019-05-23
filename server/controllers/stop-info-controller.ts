import { ServerSettingsController } from './server-settings-controller';
import * as mysql from 'mysql';
import { StopInfoResponse } from '../models/stop-info-data';


export class StopInfoController {
  constructor() {}

  public async getStopInfo(stopNum: number): Promise<StopInfoResponse> {
    const settings = ServerSettingsController.getServerConfig();

    const con = mysql.createConnection({
      host: 'localhost',
      user: settings.mysqlUsername,
      password: settings.mysqlPassword,
      database: settings.mysqlDatabase,
    });

    let result: StopInfoResponse = null;

    const sql = 'SELECT *, (stop_id LIKE \'%DB%\') AS is_dublinbus FROM stops WHERE stop_num=? LIMIT 1;';

    const query = new Promise((resolve, reject) => {
      con.query(sql, [stopNum], (err, rows) => {
        if (err) reject();

        if(rows.length == 0) {
          result = {
            status: 1,
            timestamp: new Date().toISOString(),
            result: null
          };

          resolve();
          return;
        }

        result = {
          status: 0,
          timestamp: new Date().toISOString(),
          result: {
            stop_name: rows[0]['stop_name'],
            stop_num: rows[0]['stop_num'],
            stop_lat: rows[0]['stop_lat'],
            stop_lon: rows[0]['stop_lon'],
            is_dublinbus: rows[0]['is_dublinbus']
          }
        };

        resolve();
      });
    });

    await query;

    con.end();

    return result;
  }
}
