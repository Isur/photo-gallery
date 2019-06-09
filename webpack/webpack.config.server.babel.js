import path from "path";
import nodeExternals from "webpack-node-externals";
import WebpackShellPlugin from "webpack-shell-plugin";

const { NODE_ENV = "production" } = process.env;

export default {
  target: "node",
  mode: NODE_ENV,
  watch: NODE_ENV === "development",
  context: path.resolve(__dirname, "../src/server"),
  entry: {
    server: "./index.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: NODE_ENV === "production" ? path.resolve(__dirname, "../build") : path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["awesome-typescript-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    ...NODE_ENV === "development" ? [new WebpackShellPlugin({
      onBuildEnd: ["npm run dev:server-start"],
    })] : [],
  ],
};
