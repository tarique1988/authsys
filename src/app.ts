import express from "express";
import { errorHandler } from "./middlewares/errors";
import indexRouter from "./routes/index";
import { CustomError } from "./utils/CustomError";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/v1/", indexRouter);
app.use("*", () => {
  throw new CustomError("Custom", 404, "Page not found!");
});
app.use(errorHandler);

export default app;
