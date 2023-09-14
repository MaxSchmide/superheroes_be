import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import imageController from "./controllers/image.controller";
import webhookController from "./controllers/webhook.controller";
import heroRouter from "./routes/hero.router";
import { mongooseConnect } from "./utils/db";

dotenv.config();

export const app = express();

mongooseConnect();

app.use(cors({ origin: "" })).use(express.json());

app.get("/", (_, res) => res.status(200).send("Server"));

app.post("/webhook", webhookController.listen);

app.post("/images", imageController.upload);

app.use("/heroes", heroRouter);
