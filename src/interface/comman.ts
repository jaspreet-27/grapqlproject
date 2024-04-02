import IUser from "./userInterface";
import StatusCodeEnum from "../enums/statuscodeenum";
export interface IRequest {
    user?: IUser;
  }
  
  export interface IResponse {
    status?: StatusCodeEnum;
    error?: IError;
  }
  
  export interface IError {
    message: string;
  }
  
  export function toError(message: string): IError {
    const error: IError = {
      message
    };
    return error;
  }