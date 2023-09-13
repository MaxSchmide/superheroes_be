import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import heroRouter from "./routes/heroRouter";
import { corsOptions } from "./utils/corsOptions";
import { mongooseConnect } from "./utils/db";

dotenv.config();

export const app = express();

mongooseConnect();

app.use(cors(corsOptions)).use(express.json());

app.use("/heroes", heroRouter);
