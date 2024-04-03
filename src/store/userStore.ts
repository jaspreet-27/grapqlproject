
import { model, Model, Schema, Document } from "mongoose";
import IUser from "../interface/userInterface";
import ErrorMessageEnum from "../enums/errMsgeEnum";

export interface IUserModel extends IUser, Document {
  _id: string;
}

const UserSchema = new Schema({
  Name: String,
  email: { type: String, unique: true },
  password: String
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

export default class UserStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super(ErrorMessageEnum.DATABASE_ERROR);
    }
  };

  public async createUser(attribute: IUser): Promise<IUser> {
    try {
      return await User.create(attribute);
    } catch (e) {
      console.error(e);
      throw new UserStore.OPERATION_UNSUCCESSFUL();
    }
  }

  // public async getByAttributes(attributes: object): Promise<IUser> {
  //   try {
  //     return await User.findOne(attributes).lean();
  //   } catch (e) {
  //     console.error(e);
  //     throw new UserStore.OPERATION_UNSUCCESSFUL();
  //   }
  // }

  // public async updateUser(userId: string, update: Partial<IUser>): Promise<IUserModel> {
  //   try {
  //     return await User.findByIdAndUpdate(userId, update, { new: true });
  //   } catch (e) {
  //     console.error(e);
  //     throw new UserStore.OPERATION_UNSUCCESSFUL();
  //   }
  // }

  public async updateUser(_id: string, update: Partial<IUser>): Promise<IUserModel | null> {
    try {
      // Find the user by userId
      // const userToUpdate = await User.findById(_id);

      // if (!userToUpdate) {
      //   // If user not found, return null or throw an error
      //   console.error(ErrorMessageEnum.RECORD_NOT_FOUND);
      //   throw new Error(ErrorMessageEnum.RECORD_NOT_FOUND);
      // }

      // Update the user fields
      // Object.assign(userToUpdate, update);
      const updatedUser: IUserModel = await User.findByIdAndUpdate(_id, update).lean();
      // Save the updated user
      // const updatedUser = await userToUpdate.save();
      // console.log(updatedUser)
      return updatedUser;
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, return null or throw an error
      throw new Error(ErrorMessageEnum.DATABASE_ERROR);
    }
  }
  
  public async get(attribute: IUser): Promise<IUser> {
    let user: IUser;
    try {
      user = await User.findOne({_id :attribute._id}).lean();
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
    return user;
  }


  // public async getAll(attribute: IUser): Promise<IUser> {
  //   let user: IUser;
  //   try {
  //     user = await User.find().lean();
  //   } catch (e) {
  //     return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
  //   }
  //   return user;
  // }
  public async getAll(): Promise<IUser[]> {
    try {
      const users = await User.find().lean().exec(); // Corrected Mongoose query
      return users;
    } catch (e) {
      console.error(e);
      throw new UserStore.OPERATION_UNSUCCESSFUL();
    }
  }
  

  public async deleteUser(_id: string): Promise<IUserModel | null> {
    try {
      // const find= await User.findById(_id)
      // if(!find){
      //   console.error(ErrorMessageEnum.RECORD_NOT_FOUND);
      //   throw new Error(ErrorMessageEnum.RECORD_NOT_FOUND);
      // }


      // Find the user by userId and delete
      const userDelete:IUserModel = await User.findByIdAndDelete(_id).lean();

      // if (!userDelete) {
      //   // If user not found, return null or throw an error
      //   console.error(ErrorMessageEnum.RECORD_NOT_FOUND);
      //   throw new Error(ErrorMessageEnum.RECORD_NOT_FOUND);
      // }
      
        return userDelete;
    
    } catch (error) {
      console.error(error);

      throw new Error(ErrorMessageEnum.DATABASE_ERROR);
    }
  }
}
