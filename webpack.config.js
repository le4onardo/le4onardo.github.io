/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


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
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.(mov|mp4|jpe?g|png)$/,
      type: 'asset/resource'
    },
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
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: './404.html',
      chunks: [] // file only for redirection, no JS must be loaded
    })
  ],
};