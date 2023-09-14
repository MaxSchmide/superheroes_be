import { Request, Response } from "express";
import multiparty from "multiparty";
import amazonService from "../services/amazon.service";

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

      const link = await amazonService.uploadImage(file, newFilename);

      links.push(link);
    }

    res.status(201).send({ links });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { upload };
