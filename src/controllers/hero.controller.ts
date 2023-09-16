import { Request, Response } from "express";
import heroService from "../services/hero.service";
import { handleAsyncError } from "../utils/handleAsyncError";

const DEFAULT_LIMIT = 5;
const fields = [
  "nickname",
  "real_name",
  "origin_description",
  "superpowers",
  "catch_phrase",
  "images",
];

const handleRead = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || DEFAULT_LIMIT;
  const heroes = await heroService.read({ page, perPage });

  res.status(200).send(heroes);
};

const handleReadOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const hero = await heroService.readOne(id);

  if (hero) {
    res.status(200).send(hero);
  } else {
    res.status(404).send("Not found");
  }
};

const handleCreate = async (req: Request, res: Response) => {
  const data = req.body;

  if (fields.some((field) => data[field] === undefined)) {
    res.status(400).send("Bad request");
    return;
  }

  const newHero = await heroService.create(data);
  res.status(201).send(newHero);
};

const handleUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  const updatedHero = await heroService.update(id, fieldsToUpdate);

  if (updatedHero) {
    res.status(204).send(updatedHero);
  } else {
    res.status(404).send("Not found");
  }
};

const handleRemove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await heroService.remove(id);

  if (result === null) {
    res.status(404).send("Not Found");
    return;
  }

  res.status(204).send("Successfully deleted");
};

export default {
  read: handleAsyncError(handleRead),
  readOne: handleAsyncError(handleReadOne),
  create: handleAsyncError(handleCreate),
  update: handleAsyncError(handleUpdate),
  remove: handleAsyncError(handleRemove),
};
