import { Request, Response } from "express";
import heroService from "../services/hero.service";

const DEFAULT_LIMIT = "5";

const getAll = async (req: Request, res: Response) => {
  try {
    const page = String(req.query.page) || "1";
    const perPage = String(req.query.perPage) || DEFAULT_LIMIT;
    const heroes = await heroService.getAll({ page, perPage });

    res.status(200).send(heroes);
  } catch (e) {
    res.status(500).send(e);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const fieds = [
      "nickname",
      "real_name",
      "origin_description",
      "superpowers",
      "catch_phrase",
      "images",
    ];
    const data = req.body;

    if (fieds.some((f) => data[f] === undefined)) {
      res.status(404).send("Bad request");
      return;
    }

    const newHero = await heroService.create(data);
    res.status(201).send(newHero);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default { getAll, create };
