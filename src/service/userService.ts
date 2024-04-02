

import Joi from "joi";
import StatusCodeEnum from "../enums/statuscodeenum";
import ErrorMessageEnum from "../enums/errMsgeEnum";
import IUser from "../interface/userInterface";
import * as IuserService from "../service/IUserService";
import { ServiceProxy } from "../service/serverproxy";
import UserStore from "../store/userStore";
import { toError } from "../interface/comman";

export default class UserService implements IuserService.IUserServiceAPI {
  private storage = new UserStore();
  public proxy: ServiceProxy;
  constructor(proxy: ServiceProxy) {
    this.proxy = proxy;
  }

  public createUser = async (request: IuserService.IRegisterUserRequest): Promise<IuserService.IRegisterUserResponse> => {
    const response: IuserService.IRegisterUserResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    try {
      const schema = Joi.object().keys({
        Name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().optional(),
      });

      const params = schema.validate(request, { abortEarly: false });

      if (params.error) {
        return {
          status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
          error: params.error.details.map(error => error.message)
        };
      }

      const { Name, email, password } = params.value;
      let existingUser: IUser;

      // try {
      //   existingUser = await this.storage.getByAttributes({ email });
      //   if (existingUser) {
      //     return {
      //       status: StatusCodeEnum.CONFLICT,
      //       error: ErrorMessageEnum.USER_ALREADY_EXISTS
      //     };
      //   }
      // } catch (e) {
      //   console.error(e);
      //   return {
      //     status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
      //     error: ErrorMessageEnum.DATABASE_ERROR
      //   };
      // }

      const attributes = { Name, email, password };
      let user: IUser;

      try {
        user = await this.storage.createUser(attributes);
        if (!user) {
          console.error(ErrorMessageEnum.RECORD_NOT_FOUND);
          return {
            status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
            error: ErrorMessageEnum.RECORD_NOT_FOUND
          };
        }
      } catch (e) {
        console.error(e);
        return {
          status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
          error: ErrorMessageEnum.DATABASE_ERROR
        };
      }

      return {
        status: StatusCodeEnum.OK,
        user: user
      };
    } catch (error) {
      console.error(error);
      return {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: ErrorMessageEnum.INTERNAL_SERVER_ERROR
      };
    }
  };

  public async updateUser(request: IuserService.IUpdateUserRequest): Promise<IuserService.IUpdateUserResponse> {
    const { _id, update } = request;

    const response: IuserService.IUpdateUserResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    try {
      // Validate the request
      const schema = Joi.object().keys({
        _id: Joi.string().required(),
        update: {
          Name: Joi.string().optional(),
          email: Joi.string().email().optional(),
          password: Joi.string().optional(),
        }
      });

      const params = schema.validate(request, { abortEarly: false });

      if (params.error) {
        return {
          status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
          error: params.error.details.map(error => error.message)
        };
      }
      // Update the user
      let updatedUser: IUser | null;

      try {
        updatedUser = await this.storage.updateUser(_id, update);
        if (!updatedUser) {
          console.error(ErrorMessageEnum.RECORD_NOT_FOUND);
          return {
            status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
            error: ErrorMessageEnum.RECORD_NOT_FOUND
          };
        }
        if (updatedUser) {
          return { status: StatusCodeEnum.OK, update: updatedUser }
        }
      } catch (e) {
        console.error(e);
        return {
          status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
          error: ErrorMessageEnum.DATABASE_ERROR
        };
      }

      // return {
      //     status: StatusCodeEnum.OK,

      // };
    } catch (error) {
      console.error(error);
      return {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: ErrorMessageEnum.INTERNAL_SERVER_ERROR
      };
    }
  }



  // public async deleteUser(request:IuserService.IDeleteUserRequest): Promise<IuserService.IDeleteUserResponse> {
  //   const { _id} = request;

  //   const response: IuserService.IDeleteUserResponse= {
  //       status: StatusCodeEnum.UNKNOWN_CODE
  //   };

  //   try {
  //       const schema = Joi.object().keys({
  //           _id: Joi.string().required(), 
  //           Name: Joi.string().optional(),
  //           email: Joi.string().email().optional(),
  //           password: Joi.string().optional(),
  //       });

  //       const params = schema.validate(request, { abortEarly: false });

  //       if (params.error) {
  //           return {
  //               status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
  //               error: params.error.details.map(error => error.message)
  //           };
  //       }
  //       // delete the user
  //       let deleteUser: IUser | null;

  //       try {
  //           deleteUser = await this.storage.deleteUser(_id);
  //           if (!deleteUser) {
  //               console.error(ErrorMessageEnum.RECORD_NOT_FOUND);
  //               return {
  //                   status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
  //                   error: ErrorMessageEnum.RECORD_NOT_FOUND
  //               };
  //           }
  //       } catch (e) {
  //           console.error(e);
  //           return {
  //               status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
  //               error: ErrorMessageEnum.DATABASE_ERROR
  //           };
  //       }

  //       return {
  //           status: StatusCodeEnum.OK,
  //           delete: deleteUser
  //       };
  //   } catch (error) {
  //       console.error(error);
  //       return {
  //           status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
  //           error: ErrorMessageEnum.INTERNAL_SERVER_ERROR
  //       };
  //   }
  // }

  public async deleteUser(request: IuserService.IDeleteUserRequest): Promise<IuserService.IDeleteUserResponse> {
    const { _id } = request;

    const response: IuserService.IDeleteUserResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    try {

      const schema = Joi.object().keys({
        _id: Joi.string().required()
      });

      // Validate the request
      const params = schema.validate(request, { abortEarly: false });
      // const params = schema.validate({ _id: _id }, { abortEarly: false });


      if (params.error) {
        return {
          status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
          error: params.error.details.map(error => error.message)
        };
      }



      // let findUser = await this.storage.finduser(id)
      // Delete the user
      let deleteUser: IUser | null;

      try {
        deleteUser = await this.storage.deleteUser(_id);

        if (!deleteUser) {
          console.error(ErrorMessageEnum.RECORD_NOT_FOUND);
          return {
            status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
            error: ErrorMessageEnum.RECORD_NOT_FOUND
          };
        }
        if (deleteUser) {
          return {
            status: StatusCodeEnum.OK,
            delete: "success fully deleted"
          }
        }
      } catch (e) {
        console.error(e);
        return {
          status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
          error: ErrorMessageEnum.DATABASE_ERROR
        };
      }


      // return {
      //   status: StatusCodeEnum.OK,
      //   delete: deleteUser
      // };
    } catch (error) {
      console.error(error);
      return {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: ErrorMessageEnum.INTERNAL_SERVER_ERROR
      };
    }
  }
    public getUsers= async (
      request: IuserService.IGetUserRequest): Promise<IuserService.IGetUserResponse> => {
      const response: IuserService.IGetUserResponse = {
        status: StatusCodeEnum.UNKNOWN_CODE,
      };

      const schema = Joi.object().keys({
        _id: Joi.string().required(),
      });

      const params = schema.validate(request);
      if (params.error) {
        console.error(params.error);
        response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
        response.error = params.error;
        return response;
      }

      const { _id } = params.value;
      let user: IUser;
      try {
        user = await this.storage.get({ _id });

        //if user's id is incorrect
        if (!user) {
          const errorMsg = ErrorMessageEnum.INVALID_USER_ID;
          response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
          response.error = toError(errorMsg);
          return response;
        }
      } catch (e) {
        console.error(e);
        response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
        response.error = toError(e.message);
        return response;
      }
      response.status = StatusCodeEnum.OK;
      response.user = user;
      return response;
    };



  // }

}