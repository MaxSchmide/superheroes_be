import { Request, Response } from "express";
import heroService from "../services/hero.service";

const DEFAULT_LIMIT = "5";
const fields = [
  "nickname",
  "real_name",
  "origin_description",
  "superpowers",
  "catch_phrase",
  "images",
];

const read = async (req: Request, res: Response) => {
  try {
    const page = String(req.query.page) || "1";
    const perPage = String(req.query.perPage) || DEFAULT_LIMIT;
    const heroes = await heroService.read({ page, perPage });

    res.status(200).send(heroes);
  } catch (e) {
    res.status(500).send(e);
  }
};

const readOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hero = await heroService.readOne(id);

    if (hero) {
      res.status(200).send(hero);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (fields.some((field) => data[field] === undefined)) {
      res.status(400).send("Bad request");
    }

    const newHero = await heroService.create(data);
    res.status(201).send(newHero);
  } catch (e) {
    res.status(500).send(e);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const fieldsToUpdate = req.body;

    const updatedHero = await heroService.update(id, fieldsToUpdate);

    res.status(204).send(updatedHero);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await heroService.remove(id);

    if (result === null) {
      res.status(404).send("Not Found");
      return;
    }

    res.status(200).send("Successfully deleted");
  } catch (e) {
    res.status(500).send(e);
  }
};

export default { read, readOne, create, update, remove };
