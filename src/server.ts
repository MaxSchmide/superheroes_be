import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import heroRouter from "./routes/hero.router";
import { corsOptions } from "./utils/corsOptions";
import { mongooseConnect } from "./utils/db";

dotenv.config();

export const app = express();

mongooseConnect();

app.use(cors({ origin: "" })).use(express.json());

app.get("/", (_, res) => res.status(200).send("Hello"));

app.use("/heroes", heroRouter);
