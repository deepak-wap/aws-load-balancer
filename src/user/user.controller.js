import response from "../common/middleware/response.middleware.js";
import * as UserService from "./user.service.js"

export const addUser = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);

    res.data = user;
    res.statusCode = 201;
    res.message = "User created";

    return response(req, res);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const user = await UserService.getUsers();

    res.data = user;
    res.statusCode = 200;
    res.message = "User Fetched.";

    return response(req, res);
  } catch (error) {
    next(error);
  }
};
