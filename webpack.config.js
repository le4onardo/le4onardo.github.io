/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module:{
      rules: [{
        test: /\.tsx?$/,
        loader:'ts-loader',
        //exclude: /node_modules/
        options: {
          allowTsInNodeModules:true
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.(mov|mp4|jpe?g|png)$/, type: 'asset' }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist'
  },
  plugins: [new HtmlWebpackPlugin({
      template: './index.html'
  })],
};