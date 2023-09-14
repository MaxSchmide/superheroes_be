import { CorsCallback } from "../types/CorsCallback";
import "dotenv/config";

const whitelist = process.env.CLIENT_ORIGINS.split(",");

export const corsOptions = {
  origin: (origin: string, callback: CorsCallback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, origin);
    } else {
      callback(null, false);
    }
  },
};
