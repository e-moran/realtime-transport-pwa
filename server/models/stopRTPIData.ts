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

export interface TFIApiResult {
  arrivaldatetime: string;
  duetime: string;
  departuredatetime: string;
  departureduetime: string;
  scheduledarrivaldatetime: string;
  scheduleddeparturedatetime: string;
  destination: string;
  destinationlocalized: string;
  origin: string;
  originlocalized: string;
  direction: string;
  operator: string;
  operatortype: string;
  additionalinformation: string;
  lowfloorstatus: string;
  route: string;
  sourcetimestamp: string;
  monitored: string;
}

export interface TFIApiResponse {
  errorcode: string;
  errormessage: string;
  numberofresults: number;
  stopid: string;
  timestamp: string;
  results: TFIApiResult[];
}


