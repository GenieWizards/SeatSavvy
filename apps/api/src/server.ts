import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

// TODO: Example code (Delete Me)
// import type { TDemoSchema } from "@seatsavvy/types";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      // const demoSchema: TDemoSchema = {
      //   name: "John Doe",
      // };
      return res.json({ ok: true });
    });

  return app;
};
