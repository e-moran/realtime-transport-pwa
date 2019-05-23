import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from '../api-service.service';
import { StopInfo } from '../models/stop-info-data';

@Component({
  selector: 'app-stop-search',
  templateUrl: './stop-search.component.html',
  styleUrls: ['./stop-search.component.scss']
})
export class StopSearchComponent implements OnInit {

  public stops: StopInfo[];
  public searchField = new FormControl('');

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.searchField.valueChanges.pipe(
      debounceTime(400)
    ).subscribe((term: string) => {
      this.apiService.stopSearch(term)
        .subscribe(stops => this.stops = stops );
    })
  }

}
