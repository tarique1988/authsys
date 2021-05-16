import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../data/models/user";
import { asyncHandler } from "../middlewares/async";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import jsonResponseBuilder from "../utils/jsonResponseBuilder";
import { CustomError } from "../utils/CustomError";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const user = await User.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password,
    });
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as unknown as string,
      { expiresIn: process.env.JWT_DURATION }
    );

    res
      .status(200)
      .json(jsonResponseBuilder(true, { token }, [], "User registered!"));
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) throw new CustomError("Custom", 401, "Invalid Credentials");
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as unknown as string,
      { expiresIn: process.env.JWT_DURATION }
    );

    res
      .status(200)
      .json(jsonResponseBuilder(true, { token }, [], "User registered!"));
  }
);

export const whoAmI = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
      throw new CustomError("Custom", 401, "Authorization failed.");

    const token = req.headers.authorization.split(" ")[1];

    const id = (
      jwt.verify(
        token,
        process.env.JWT_SECRET as unknown as string
      ) as unknown as { id: string }
    ).id;

    const user = await User.findById(id).select("name email");

    if (!user) throw new CustomError("Custom", 401, "Authorization failed.");

    res
      .status(200)
      .json(jsonResponseBuilder(true, { user }, [], `You're ${user?.name}!`));
  }
);
