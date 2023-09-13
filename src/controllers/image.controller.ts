import { PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config";
import { Request, Response } from "express";
import fs from "fs";
import mime from "mime-types";
import multiparty from "multiparty";
import { client } from "../utils/s3client";

const upload = async (req: Request, res: Response) => {
  try {
    const form = new multiparty.Form();

    const { files } = await new Promise<any>((resolve, reject) => {
      form.parse(req, (err, _, files) => {
        if (err) reject(err);

        resolve({ files });
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
    res.status(201).send({ links });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { upload };
