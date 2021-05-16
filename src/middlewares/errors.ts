import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import jsonResponseBuilder from "../utils/jsonResponseBuilder";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error: CustomError

  switch (err.name) {
    case "Custom":
      error = err as CustomError
      break;
    default:
      error = new CustomError("Unknown", 500, `Something went wrong. ErrorName: ${err.name} | ErrorMessage: ${err.message}`)
  }

  res.status(error.statusCode).json(
    jsonResponseBuilder(
      false, {}, [{name: error.name, message: error.message}], "There was an error. Check the errors list for more information."
    )
  )
}