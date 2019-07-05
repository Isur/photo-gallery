import express from "express";
import * as imagesController from "../controllers/images";

export const router = express.Router();

router.get("/counter", async (req: express.Request, res: express.Response) => {
  const imageCounter = await imagesController.imagesCounter();
  res.json({ counter: imageCounter });
});

router.get("/:number", async (req: express.Request, res: express.Response) => {
  const image = await imagesController.getImages(req.params.number);
  res.json({ image });
});
