import { CorsCallback } from "../types/CorsCallback";
import "dotenv/config";

const whitelist = ["http://localhost:5173"];

export const corsOptions = {
  origin: (origin: string, callback: CorsCallback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
