const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ["bootstrap", "jquery", "react", "react-dom"];

module.exports = {
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  mode: 'development',
  module: {
    rules: [
      {
        // Hướng dẫn babel làm thế nào để làm việc với webpack
        loader: "babel-loader",
        test: /\.js$/,
        exclude: "/node_module/",
        options: {
          //preset-env: chuyển đổi ES 6,7,8 về ES5
          // khai báo preset sử dụng để chuyển đổi jsx sang js
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         // importLoaders: 1,
      //         // modules: true,
      //         // name: "css/[name].[ext]",
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.jpe$g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.waw$|\.mp3$|\.icon$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"],
    }),
    // new webpack.optimization.CommonsChunkPlugin({
    //   name: 'vendor',
    //   // (the commons chunk name)

    //   // filename: 'commons.js',
    //   // (the filename of the commons chunk)
    // }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template:'src/index.html',
    })
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor",
  //         chunks: "all",
  //       },
  //     },
  //   },
  //   runtimeChunk: {
  //     name: "manifest",
  //   },
  // },
};
