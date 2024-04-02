
  
import * as IuserService from "../service/IUserService";
import UserService from "./userService";

export interface ServiceProxy {
  user: IuserService.IUserServiceAPI;
}

class AppServiceProxy implements ServiceProxy {
  public user: IuserService.IUserServiceAPI;
  constructor() {
    this.user = new UserService(this);
  }
}

export default new AppServiceProxy();
