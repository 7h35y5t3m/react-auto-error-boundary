const path = require('path');
const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Точка входа
  entry: ['whatwg-fetch', paths.src + '/index.js'],

  // Выходные файлы
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
    
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'components': path.resolve(__dirname, '../src/components/'),
      'images': path.resolve(__dirname, '../src/images/'),
      'styles': path.resolve(__dirname, '../src/styles/'),
    }
  },
	
  // Плагины
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'React App',
      filename: 'index.html',
      template: paths.src + '/template.html',
    }),
  ],

  // Правила для модулей
  module: {
    rules: [
      // JavaScript/JSX: ТОЛЬКО ОДНО ПРАВИЛО
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },

      // Styles
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          },
        ],
      },

      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },

      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      },
    ],
  },
  
  // Настройки dev server (если нужно)
  devServer: {
    static: {
      directory: paths.build,
    },
    port: 3000,
    hot: true,
    historyApiFallback: true, // важно для React Router
  },
};