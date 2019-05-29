import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StopRtpiComponent } from './stop-rtpi/stop-rtpi.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatExpansionModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DueTimePipe } from './due-time.pipe';
import { DropdownRouteInfoComponent } from './dropdown-route-info/dropdown-route-info.component';
import { AgmCoreModule } from '@agm/core';
import { GMAPS_KEY } from './keys';
import { StopSearchComponent } from './stop-search/stop-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StopOperatorPipe } from './stop-operator.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    StopRtpiComponent,
    NavComponent,
    DueTimePipe,
    DropdownRouteInfoComponent,
    StopSearchComponent,
    StopOperatorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: GMAPS_KEY
    }),
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
