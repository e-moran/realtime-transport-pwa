import { Component, Input, OnInit } from '@angular/core';
import { StopRTPIBusData } from '../models/stop-rtpi-model';
import { ApiService } from '../api-service.service';
import { RouteInfo, RouteStop } from '../models/route-info-model';

@Component({
  selector: 'app-dropdown-route-info',
  templateUrl: './dropdown-route-info.component.html',
  styleUrls: ['./dropdown-route-info.component.scss']
})
export class DropdownRouteInfoComponent implements OnInit {

  @Input()
  private rtpiData: StopRTPIBusData;
  @Input()
  private stopNum: number;

  public routeInfo: RouteInfo;
  public thisStop: RouteStop;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  public fetchRouteInfo(): void {
    if(!this.routeInfo) { // If the user opens and closes the drop down we don't want to reload the data
      this.apiService.getRouteInfo(this.stopNum, this.rtpiData).subscribe(data => {
        this.routeInfo = data;
        this.routeInfo.stops.forEach(stop => {
          if (stop.num == this.stopNum) {
            this.thisStop = stop;
            console.log(this.thisStop);
          }
        });
      });
    }
  }

}
