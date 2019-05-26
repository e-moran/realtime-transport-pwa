import { StopRTPIBusData } from './stop-rtpi-data';
import { RouteTripData } from './route-trip-data';

export interface RTPITripCombiResponse {
  status: number;
  timestamp: string;
  result: RTPITripCombiData[];
}

export interface RTPITripCombiData {
  rtpiinfo: StopRTPIBusData;
  tripdata: RouteTripData;
}
