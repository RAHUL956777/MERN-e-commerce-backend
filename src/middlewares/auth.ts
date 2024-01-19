import { User } from "../models/user.model";
import ErrorHandler from "../utils/utilityClass";
import { TryCatch } from "./error";

export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("Sale login kar pahle", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Sale fake id deta hei", 401));

  if (user.role !== "admin")
    return next(new ErrorHandler("Sale okat nehi ha teri", 403));

    next();
});
