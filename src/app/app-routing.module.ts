import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopRtpiComponent } from './stop-rtpi/stop-rtpi.component';

const routes: Routes = [
  { 'path': 'rtpi/:stop', 'component': StopRtpiComponent }
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
