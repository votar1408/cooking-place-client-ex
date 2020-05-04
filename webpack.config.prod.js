const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
  const getStyleLoader = () => {
    return [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { url: false }
      }
    ];
  };

  return {
    mode: 'production',
    devtool: false,
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name].[hash].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(css)$/,
          use: getStyleLoader()
        },
        {
          test: /\.(s[ca]ss)$/,
          use: [
            ...getStyleLoader(),
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },

    resolve: {
      extensions: ['*', '.js', '.jsx']
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          devServer: true
        }
      }),
      new CopyWebpackPlugin([
        {
          from: `${__dirname}/public/images`,
          to: 'images'
        }
      ]),
      new webpack.SourceMapDevToolPlugin({
        filename: '[name].[hash].js.map',
        exclude: ['bundle.js']
      }),
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist']
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJSPlugin({ sourceMap: true }),
        new ImageminPlugin({
          test: /\.(png|jpe?g|gif|svg)$/i
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: { sourceMap: true }
        })
      ]
    }
  };
};
