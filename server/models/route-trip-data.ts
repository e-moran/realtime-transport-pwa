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

export interface RouteStopDBRow {
  id: number;
  trip_id: string;
  route_num: string;
  direction: string;
  stop_id: string;
  stop_num: number;
  departure_time: string;
  day_id: number;
}
