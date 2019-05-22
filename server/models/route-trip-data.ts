export interface RouteTripDataResponse {
  status: number;
  timestamp: string;
  result: RouteTripData;
}

export interface RouteTripData {
  stops: RouteStop[];
}

export interface RouteStop {
  id: string;
  name: string;
  num: number;
  time: string;
  sequence: number;
  stop_lat: number;
  stop_lon: number;
}
