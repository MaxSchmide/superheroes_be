import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config";
import fs from "fs";
import mime from "mime-types";
import { client } from "../utils/s3client";

const uploadImage = async (file: any, filename: string) => {
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename,
      Body: fs.readFileSync(file.path),
      ACL: "public-read",
      ContentType: mime.lookup(file.path) || undefined,
    })
  );
  const link = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`;

  return link;
};

const deleteImage = (doc: string) =>
  client.send(
    new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: doc,
    })
  );

export default { uploadImage, deleteImage };
