import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { port } from "./utils/env.js";
import api from "./routes/api.js";

const main = async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (_, res) => {
      res.status(200).json({
        message: "DVE API Ready!",
        data: null,
      });
    });
    app.use(api);

    app.listen(port, () => {
      console.log(`Server is Running on port ${port}`);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

main();
