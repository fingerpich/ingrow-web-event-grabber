interface IngrowOptions {
  apiKey: string, 
  projectID: string, 
  userId?: string
}
interface Options {
  sendDeviceInfo: boolean,
  done: (err: object, response: object) => void
}

interface Rates {
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

export function startEventGrabber(ingrow: Ingrow | IngrowOptions, rates?: Rates, middleWares?: Array<function>)

export function setUser(userId: string)