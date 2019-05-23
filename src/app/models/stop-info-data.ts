export interface StopInfoResponse {
  status: number;
  timestamp: string;
  result: StopInfo;
}

export interface StopInfo {
  stop_name: string;
  stop_num: number;
  stop_lon: number;
  stop_lat: number;
  is_dublinbus: boolean;
}
