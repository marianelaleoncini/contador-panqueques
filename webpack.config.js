const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const PROD = process.env.NODE_ENV === 'production';
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: PROD ? '[name].[hash].js' : '[name].js',
  },
  mode: PROD ? 'production' : 'development',
  plugins: [
    new CleanWebpackPlugin(), // clean the dist folder in each build
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: "./src/favicon.png",
    }),
    new MiniCssExtractPlugin({
      filename: PROD ? '[name].[hash].css' : '[name].css',
      chunkFilename: PROD ? '[id].[hash].css' : '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: PROD },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        loader: [
          PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: PROD,
            },
          },
        ],
      },
     
    ],
  },
};
