const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: {
                filter: (url) => {
                  // Semantic-UI-CSS has an extra semicolon in one of the URL due to which CSS loader along
                  // with webpack 5 fails to generate a build.
                  // Below if condition is a hack. After Semantic-UI-CSS fixes this, one can replace use clause with just
                  // use: ['style-loader', 'css-loader']
                  // See: https://github.com/Semantic-Org/Semantic-UI-CSS/issues/75#issuecomment-1005395285
                  if (url.includes('charset=utf-8;;')) {
                    return false;
                  }
                  return true;
                },
              }
            }
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
});
