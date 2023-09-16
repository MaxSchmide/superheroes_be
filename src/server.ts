import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import webhookController from "./controllers/webhook.controller";
import heroRouter from "./routes/hero.router";
import imageRouter from "./routes/image.router";
import { mongooseConnect } from "./utils/db";
import { corsOptions } from "./utils/corsOptions";

dotenv.config();

const app = express();

mongooseConnect();

app.use(cors(corsOptions)).use(express.json());

app.get("/", (_, res) => res.status(200).send("Server"));

app.post("/webhook", webhookController.listen);

app.use("/heroes", heroRouter);
app.use("/images", imageRouter);

export default app;
