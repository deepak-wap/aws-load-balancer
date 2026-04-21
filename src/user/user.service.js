import { throwError } from "../common/utils/error.util.js";
import UserModel from "./user.model.js";

export const createUser = async (data) => {
  // return throwError(400, 'Email already in use');
  return data;
};

export const getUsers = async (data) => {
  const users = await UserModel.find();
  return users;
};
