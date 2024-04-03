import IUser from "../interface/userInterface";
import { IRequest, IResponse } from "../interface/comman";

export interface IUserServiceAPI {
  // getUsers(request:IGetUserRequest):Promise<IGetUserResponse>;
  createUser(request: IRegisterUserRequest): Promise<IRegisterUserResponse>;
  updateUser(request: IUpdateUserRequest): Promise<IUpdateUserResponse>;
  deleteUser(request: IDeleteUserRequest): Promise<IDeleteUserResponse>
  getUsers(request: IGetUserRequest): Promise<IGetUserResponse>
  getAllusers(request:IGetAllUserRequest):Promise<IGetAllUserResponse>


}
export interface IRegisterUserRequest extends IRequest {
  _id?: string;
  Name?: string
  email?: string
  password?: string

}
export interface IRegisterUserResponse extends IResponse {
  user?: IUser;
  error?: any;
}
export interface IUpdateUserRequest extends IRequest {
   update?:{
  Name: string;
  email: string;
  password: string;
   }
   _id?:string

}
export interface IUpdateUserResponse extends IResponse {
  update?: IUser;
  error?: any;

}
export interface IDeleteUserRequest extends IRequest {
  _id?: string;
 
  // delete: any
};
export interface IDeleteUserResponse extends IResponse {
  delete?: any;
  error?: any;

}
export interface IGetUserRequest extends IRequest {
  _id?: string;
};
export interface IGetUserResponse extends IResponse {
  user?:IUser 
  error?: any;

}

export interface IGetAllUserRequest extends IRequest {

};
export interface IGetAllUserResponse extends IResponse {
  user?:IUser[]
  error?: any;

}





