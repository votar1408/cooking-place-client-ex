const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  const getStyleLoader = () => {
    return [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: { url: false }
      }
    ];
  };

  return {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].js',
      publicPath: '/'
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      port: 3000,
      hot: true,
      open: true
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
                name: '[name]-[sha1:hash:7].[ext]'
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
        filename: '[name].js.map',
        exclude: ['bundle.js']
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      })
    ]
  };
};
