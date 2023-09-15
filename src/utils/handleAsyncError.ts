import { Request, Response } from "express";

type Handler = (req: Request, res: Response) => Promise<void>;

export const handleAsyncError =
  (handler: Handler) => async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };
