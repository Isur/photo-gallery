/* eslint-disable no-console */
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import chalk from "chalk";
import * as api from "./api";

const app = express();
const port = process.env.PORT || 5004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api.router);

if(process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`${chalk.yellow.bold("Server started on port")} ${chalk.red.bold(`${port}`)}`));

export default app;
