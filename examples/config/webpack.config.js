const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./examples/index.js",
  output: {
    filename: "main.js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./examples/config/index.html"
    })
  ],
  devServer: {
    contentBase: "./dist",
    disableHostCheck: true
  }
};
