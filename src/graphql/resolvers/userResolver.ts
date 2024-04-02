/* eslint-disable no-useless-catch */
import { ApolloError } from "apollo-server-express";
import StatusCodeEnum from "../../enums/statuscodeenum";
import proxy from "../../service/serverproxy";
import * as IUserService from "../../service/IUserService";
import { response } from "express";


export default {
  // Query: {
  //   async getUsers(parent, args) {
  //     try {
  //       const response = await proxy.user.getUsers(); // Assuming getUsers method exists in proxy.user
  //       if (response.status !== StatusCodeEnum.OK) {
  //         throw new ApolloError(response.error.message);
  //       }
  //       return response;
  //     } catch (error) {
  //       throw new ApolloError(error.message);
  //     }
  //   }
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

      return response;
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
