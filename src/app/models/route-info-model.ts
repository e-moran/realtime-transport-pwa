export interface RouteTripDataResponse {
  status: number;
  timestamp: string;
  result: RouteInfo;
}

export interface RouteInfo {
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
