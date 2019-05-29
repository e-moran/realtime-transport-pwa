import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopRtpiComponent } from './stop-rtpi/stop-rtpi.component';
import { StopSearchComponent } from './stop-search/stop-search.component';

const routes: Routes = [
  { path: 'rtpi/:stop', component: StopRtpiComponent },
  { path: 'stopsearch', component: StopSearchComponent },
  { path: '', component: StopSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: true
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
