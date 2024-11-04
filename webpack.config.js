/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
  entry: './src/index.tsx',
  // devtool: 'inline-source-map',  // FIX: increases bundle size to almost 5 MB
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      //exclude: /node_modules/
      options: {
        allowTsInNodeModules: true
      }
    },
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
      test: /\.(mov|mp4|jpe?g|png)$/,
      type: 'asset/resource'
    },
    /*
    Moves fonts to another
    {
      test: /\.woff2$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[base]'
      }
    },
    */
    {
      test: /\.mdx?$/,
      use: [{
        loader: '@mdx-js/loader',
        options: {}
      }]
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
    historyApiFallback: {
      rewrites: [{ from: /\//, to: '/404.html' }],
      verbose: true
    },
  },
  plugins: [
    // creates css files
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    //creates html
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // injects css files as <style>
    new HTMLInlineCSSWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: './404.html',
      chunks: [] // file only for redirection, no JS must be loaded
    })
  ],
};