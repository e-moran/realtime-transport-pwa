import {StopRTPIBusData, StopRTPIResponseData, TFIApiResponse} from '../models/stopRTPIData';
import { Request } from 'express';
import axios from 'axios';
import * as https from 'https';

export class StopRTPIController {
  constructor() {}

  public getStopRTPIData(req: Request): Promise<StopRTPIResponseData> {
    let resp: StopRTPIResponseData;

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    return instance.get<TFIApiResponse>('https://185.95.173.67/RTPIPublicService_V2/service.svc/realtimebusinformation', {
      params: {
        stopid: req.params.stopid,
        format: 'json'
      }
    }).then(res => {
      let results: StopRTPIBusData[] = [];
      res.data.results.forEach(result => {
        results.push({
          actualDepartureDateTime: result.departuredatetime,
          scheduledDepartureDateTime: result.scheduleddeparturedatetime,
          dueTime: +result.duetime,
          destination: result.destination,
          direction: result.direction.charAt(0),
          route: result.route
        });
      });
      resp = {
        errorCode: +res.data.errorcode,
        timestamp: res.data.timestamp,
        results: results
      };
      return resp;
    }).catch(error => {
      console.log(error);
      resp = {
        errorCode: error.response.status as number,
        timestamp: '',
        results: [] as StopRTPIBusData[],
      };
      return resp;
    });
  }
}
