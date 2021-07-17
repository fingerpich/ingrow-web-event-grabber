declare interface IngrowOptions {
  apiKey: string, 
  projectID: string, 
  userId?: string
}
declare interface Options {
  sendDeviceInfo: boolean,
  done: (err: object, response: object) => void
}

declare interface Rates {
  mouse?: number, 
  page?: number, 
  error?: number, 
  domChange?: number
}

export declare class Ingrow {
  constructor(apiKey: string, projectID: string, userId?: string);
  setUserID(userID: string): void;
  sendEvent(stream: string, data: object, options?: Options): void;
}
declare function NextMiddleware(newEventData?: Object): void
declare function Middleware(eventData?: Object, next?: NextMiddleware): void

export declare function startEventGrabber(
  ingrow: Ingrow | IngrowOptions, 
  rates?: Rates, 
  middleWares?: Array<Middleware>)

export declare function setUser(userId: string)