import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api-service.service';
import { StopRTPIBusData } from '../models/stop-rtpi-model';

@Component({
  selector: 'app-stop-rtpi',
  templateUrl: './stop-rtpi.component.html',
  styleUrls: ['./stop-rtpi.component.scss']
})
export class StopRtpiComponent implements OnInit {

  public rtpiInfo: StopRTPIBusData[];
  public stopNum: number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stopNum = +this.route.snapshot.paramMap.get('stop');
    this.getRTPIInfo();
  }

  getRTPIInfo(): void {
    this.apiService.getStopRTPIInfo(this.stopNum).subscribe(resp => {
      this.rtpiInfo = resp;
    });
  }
}
