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
  num: number;
  time: string;
}
