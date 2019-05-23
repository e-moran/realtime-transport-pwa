import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StopRTPIBusData, StopRTPIResponseData } from './models/stop-rtpi-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouteInfo, RouteTripDataResponse } from './models/route-info-model';
import { StopInfo, StopInfoResponse } from './models/stop-info-data';
import { StopSearchResponse } from './models/stop-search-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = '/api/';

  constructor(private http: HttpClient) { }

  public getStopRTPIInfo(stopid: number): Observable<StopRTPIBusData[]> {
    return this.http.get<StopRTPIResponseData>(this.apiURL + 'stoprtpi/' + stopid).pipe(
      map((resp: StopRTPIResponseData) => {
        return resp.results;
      })
    );
  }

  public getRouteInfo(stopnum: number, rtpiData: StopRTPIBusData): Observable<RouteInfo> {
    return this.http.get<RouteTripDataResponse>(this.apiURL + 'routestops/' + stopnum + '/'
      + rtpiData.route + '/' + rtpiData.direction + '/' + encodeURIComponent(rtpiData.scheduledDepartureDateTime.split(' ')[1]) +
      '/' + rtpiData.operator).pipe(
        map((resp: RouteTripDataResponse) => {
          return resp.result;
        })
    )
  }

  public getStopInfo(stopnum: number): Observable<StopInfo> {
    return this.http.get<StopInfoResponse>(this.apiURL + 'stopinfo/' + stopnum).pipe(
      map((resp: StopInfoResponse) => {
        return resp.result;
      })
    )
  }

  public stopSearch(term: string): Observable<StopInfo[]> {
    return this.http.get<StopSearchResponse>(this.apiURL + 'stopsearch/' + term).pipe(
      map((resp: StopSearchResponse) => {
        return resp.stops;
      })
    )
  }
}
