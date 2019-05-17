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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getRTPIInfo();
  }

  getRTPIInfo(): void {
    const id = +this.route.snapshot.paramMap.get('stop');
    this.apiService.getStopRTPIInfo(id).subscribe(resp => {
      this.rtpiInfo = resp;
    });
  }
}
