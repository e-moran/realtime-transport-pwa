import { StopInfoResponse } from '../models/stop-info-data';
import { MySQLService } from '../models/mysql-service';


export class StopInfoController {
  constructor() {}

  public async getStopInfo(stopNum: string): Promise<StopInfoResponse> {
    return new MySQLService().searchQuery(stopNum).then(rows => {
      return {
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
}
