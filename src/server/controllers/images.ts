import fs from "fs";
import path from "path";
import { images } from "../db/images";

export async function imagesCounter(): Promise<number> {
  return images.length;
}

export async function getImages(id: number) {
  const pathname = path.resolve(`.${images[id].src}`);
  const bitmap = fs.readFileSync(pathname);
  const pathnameEdited = path.resolve(`.${images[id].srcEdit}`);
  const bitmapEdited = fs.readFileSync(pathnameEdited);
  const img = Buffer.from(bitmap).toString("base64");
  const imgEdited = Buffer.from(bitmapEdited).toString("base64");
  return {
    base64: img,
    base64Edited: imgEdited,
    filename: images[id].title,
    desc: images[id].desc,
    orientation: images[id].orientation || "landscape",
  };
}
