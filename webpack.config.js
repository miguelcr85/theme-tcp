const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = [{
    entry: {
        styles: './assets/sass/_core.scss',
        scripts: './assets/js/_core.js'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./assets/dist")
    },
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                // fallback to style-loader in development
                process.env.NODE_ENV !== "production"
                  ? "style-loader"
                  : MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                    },
                },
              ],
            },
        ],
    },
    optimization: {
        minimize: process.env.NODE_ENV === "production"?true:false,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].css",
          chunkFilename: "[id].css",
        })
    ],
}];
module.exports.parallelism = 1;