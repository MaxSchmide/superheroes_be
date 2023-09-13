import { Request, Response } from "express";
import heroService from "../services/hero.service";
import multiparty from "multiparty";
import { client } from "../utils/s3client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";
import fs from "fs";

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

const create = async (req: Request, res: Response) => {
  try {
    const form = new multiparty.Form();

    const data = req.body;

    if (fields.some((f) => data[f] === undefined)) {
      res.status(404).send("Bad request");
      return;
    }

    const { files } = await new Promise<any>((resolve, reject) => {
      form.parse(data.images, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const links = [];

    for (const file of files.file) {
      const ext = file.originalFilename.trim().split(".").pop();
      const newFilename = Date.now() + "." + ext;
      await client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: newFilename,
          Body: fs.readFileSync(file.path),
          ACL: "public-read",
          ContentType: mime.lookup(file.path) || undefined,
        })
      );

      const link = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${newFilename}`;
      links.push(link);
    }

    const heroData = {
      ...data,
      images: links,
    };

    const newHero = await heroService.create(heroData);
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
      res.status(404).send("Bad request");
      return;
    }

    res.status(200).send("Successfully deleted");
  } catch (e) {
    res.status(500).send(e);
  }
};

export default { read, create, update, remove };
