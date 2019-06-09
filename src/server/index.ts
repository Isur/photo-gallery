/* eslint-disable no-console */
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import chalk from "chalk";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res): void => {
  res.json({ test: "api response" });
});

if(process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const port = process.env.PORT || 5004;
app.listen(port, () => console.log(`${chalk.yellow.bold("Server started on port")} ${chalk.red.bold(`${port}`)}`));

export default app;
