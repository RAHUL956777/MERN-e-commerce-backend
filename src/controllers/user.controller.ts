import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { NewUserRequestBody } from "../types/types";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, photo, gender, _id, dob } = req.body;
    const user = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob,
    });

    return res.status(200).json({
      success: true,
      message: `Welcome ${user.name}`,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
