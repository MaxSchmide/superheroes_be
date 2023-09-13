import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import heroRouter from "./routes/hero.router";
import { corsOptions } from "./utils/corsOptions";
import { mongooseConnect } from "./utils/db";
import webhookController from "./controllers/webhook.controller";

dotenv.config();

export const app = express();

mongooseConnect();

app.use(cors({ origin: "http://localhost:5173" })).use(express.json());

app.get("/", (_, res) => res.status(200).send("Server"));

app.post("/webhook", webhookController.listen);

app.use("/heroes", heroRouter);
