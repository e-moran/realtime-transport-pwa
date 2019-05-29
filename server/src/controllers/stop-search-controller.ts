import { StopSearchResponse } from '../models/stop-search-data';
import { StopInfo } from '../models/stop-info-data';
import { MySQLService } from '../models/mysql-service';

export class StopSearchController {
  constructor() {}


  public async searchForStops(term: string): Promise<StopSearchResponse> {
    return new MySQLService().searchQuery(term).then(rows => {
      let stops: StopInfo[] = [];
      rows.forEach(row => {
        stops.push({
          stop_name: row['stop_name'],
          stop_num: row['stop_num'],
          stop_lat: row['stop_lat'],
          stop_lon: row['stop_lon'],
          is_dublinbus: row['is_dublinbus'] == 1
        })
      });

      return {
        status: 0,
        timestamp: new Date().toISOString(),
        stops: stops
      };
    }).catch(err => {
      let status = 1;

      if(err != 0)
        status = 2;

      return {
        status: status,
        timestamp: new Date().toISOString(),
        stops: null
      }
    });
  }
}
