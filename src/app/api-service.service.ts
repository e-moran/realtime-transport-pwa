import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StopRTPIBusData, StopRTPIResponseData } from './models/stop-rtpi-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
