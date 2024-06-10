import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const userJSON = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userJSON });
};
