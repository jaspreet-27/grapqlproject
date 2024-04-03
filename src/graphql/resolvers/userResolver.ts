/* eslint-disable no-useless-catch */
import { ApolloError } from "apollo-server-express";
import StatusCodeEnum from "../../enums/statuscodeenum";
import proxy from "../../service/serverproxy";
import * as IUserService from "../../service/IUserService";
import { request, response } from "express";


export default {
  Query: {
    async getUsers(parent, args) {
      const { _id } = args;
      const request: IUserService.IGetUserRequest= {_id};
  
        let response: IUserService.IGetUserResponse;
      
      try {
         response = await proxy.user.getUsers({_id}); 
        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message);
        }
        return response.user;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },


  //   async getallUsers(parent, args) {
      
  //     const request:IUserService.IGetAllUserRequest={}
  
  //     let response: IUserService.IGetAllUserResponse=
      
  //     try {
  //        response= await proxy.user.getUsers(request); 
  //       if (response.status !== StatusCodeEnum.OK) {
  //         throw new ApolloError(response.error.message);
  //       }
  //       return response.user;
  //     } catch (error) {
  //       throw new ApolloError(error.message);
  //     }
  //   }
  async getAllUsers(parent, args) {
    const request: IUserService.IGetAllUserRequest = {};
  
    try {
      const response = await proxy.user.getAllusers(request);
      if (response.status !== StatusCodeEnum.OK) {
        throw new ApolloError(response.error.message);
      }
      return response.user; // Corrected property name
    } catch (error) {
      throw new ApolloError(error.message);
    }
  }
  
    
  },
  // },

  Mutation: {
    async createUser(parent, args) {
      const {
        user: { Name,  email, password },
      } = args;

      const request: IUserService.IRegisterUserRequest = {
        Name,
        email,
        password,
      };

      let response: IUserService.IRegisterUserResponse;

      try {
        response = await proxy.user.createUser(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
          
          );
        }
      } catch (e) {
        throw e;
      }

      return response.user;
    },
    async updateUser(parent, args) {
      const { _id ,update} = args;
      const request: IUserService.IUpdateUserRequest = {
      _id,update
      };

      let response: IUserService.IUpdateUserResponse;

      try {
         response = await proxy.user.updateUser({_id,update});
        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message);
        }
        return response.update;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },

    async deleteUser(parent,args){
      const { _id } = args;
      const request: IUserService.IDeleteUserRequest = { _id};

      let response: IUserService.IDeleteUserResponse;

      try {
         response = await proxy.user.deleteUser({_id});
        if (response.status!== StatusCodeEnum.OK){
        throw new ApolloError (response.error.message);
      }
      return response.delete
      
      } catch (error) {
        throw new ApolloError(error.message);
      }
    }


        
}};
