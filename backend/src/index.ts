import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/routes";
import dbInit from "./config/Mongodb";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

const port = process.env.PORT || 3001;

app.use("/", router);
app.use(function (req: Request, res: Response) {
  console.log(req.url);
  res.status(404).json({
    error: {
      name: "Error",
      status: 404,
      message: "Invalid Request",
      stack: "http://localhost:3001/",
    },
    message: "Porta inválida!",
  });
});
try {
  dbInit();
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
} catch (error) {
  console.log(`Error occured: ${error}`);
}
