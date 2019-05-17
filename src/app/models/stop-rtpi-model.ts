export interface StopRTPIResponseData {
  errorCode: number;
  timestamp: string;
  results: StopRTPIBusData[];
}

export interface StopRTPIBusData {
  actualDepartureDateTime: string;
  scheduledDepartureDateTime: string;
  dueTime: number;
  destination: string;
  direction: string;
  route: string;
}
