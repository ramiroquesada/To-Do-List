const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/srcindex.html",
    }),
    new FaviconsWebpackPlugin('./src/images/favicon.png')
    
  ],
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
        new TerserPlugin({
            extractComments: false,
          }),
    ],
},
  mode: "development",
 

};
