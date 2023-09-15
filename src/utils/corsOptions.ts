import { CorsCallback } from "../types/CorsCallback";
import "dotenv/config";

const whitelist = [
  "http://localhost:5173",
  "https://superheroes-library.netlify.app",
];

export const corsOptions = {
  origin: (origin: string, callback: CorsCallback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, origin);
    } else {
      callback(null, false);
    }
  },
};
