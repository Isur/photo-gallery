import express from "express";

import * as images from "./images";

export const router = express.Router();

router.use("/images", images.router);
