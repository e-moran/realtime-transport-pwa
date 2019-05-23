import { StopInfo } from './stop-info-data';

export interface StopSearchResponse {
  status: number;
  timestamp: string;
  stops: StopInfo[];
}
