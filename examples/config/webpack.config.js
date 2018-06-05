const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./examples/index.js",
  output: {
    filename: "main.js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./examples/config/index.html"
    })
  ],
  devServer: {
    contentBase: "./dist"
  }
};
