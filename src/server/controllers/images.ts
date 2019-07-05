import fs from "fs";
import path from "path";
import { images } from "../db/images";

export async function imagesCounter(): Promise<number> {
  return images.length;
}

export async function getImages(id: number) {
//   return new Promise((resolve, reject) => {
//       const pathname = path.resolve('./public/images');
//       fs.readdir(pathname, (err, files) => {
//           const bitmap = fs.readFileSync(`${pathname}/${files[id]}`);
//           resolve({base64: new Buffer(bitmap).toString('base64'), filename: files[id]});
//         });
//   });
//   for(let i = 0; i < images.length; i++){
  const pathname = path.resolve(`.${images[id].src}`);
  const bitmap = fs.readFileSync(pathname);
  const img = new Buffer(bitmap).toString("base64");
  return {
    base64: img,
    filename: images[id].title,
    desc: images[id].desc,
    orientation: images[id].orientation || "landscape",
  };
//   }
}
