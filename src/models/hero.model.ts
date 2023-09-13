import { Model, Schema, model, models } from "mongoose";
import { IHero } from "../types/hero";

const HeroSchema = new Schema<IHero>({
  nickname: { type: String, required: true },
  real_name: { type: String, required: true },
  origin_description: { type: String, required: true },
  superpowers: [{ type: String, required: true }],
  catch_phrase: { type: String, required: true },
  images: [{ type: String, required: true }],
});

export const Hero: Model<IHero> = models?.Hero || model("Hero", HeroSchema);
