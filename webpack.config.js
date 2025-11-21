const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode !== 'production';

  return {
    mode: isDev ? 'development' : 'production',

    entry: path.resolve(__dirname, 'src', 'index.jsx'),

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isDev
        ? 'static/js/bundle.js'
        : 'static/js/[name].[contenthash:8].js',
      publicPath: '/',
      clean: true, // clean the output dir between builds
      assetModuleFilename: 'static/media/[name].[hash:8][ext][query]',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
      alias: {
        features: path.resolve(__dirname, 'src/components/features/'),
        app: path.resolve(__dirname, 'src/app/'),
        utils: path.resolve(__dirname, 'src/utils/'),
        hooks: path.resolve(__dirname, 'src/hooks/'),
        img: path.resolve(__dirname, 'src/img/'),
        svg: path.resolve(__dirname, 'src/svg/'),
        components: path.resolve(__dirname, 'src/components/'),
        auth: path.resolve(__dirname, 'src/components/features/auth/'),
      },
    },

    module: {
      rules: [
        // JS / JSX
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // Babel config should include presets for react and env
          },
        },

        // Styles (SCSS/CSS) without CSS Modules
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: false, // disable CSS Modules
              },
            },
            'sass-loader',
          ],
        },

        // Static assets (images, fonts, etc.)
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/fonts/[name].[hash:8][ext]',
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      }),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[id].[contenthash:8].css',
        }),
    ].filter(Boolean),

    devtool: isDev ? 'cheap-module-source-map' : 'source-map',

    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/',
      },
      compress: true,
      historyApiFallback: true, // SPA routing
      port: 3000,
      hot: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },

      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        devServer.app.get('/setup-middleware/some/path', (_, response) => {
          response.send('setup-middlewares option GET');
        });

        // Run a middleware before all others
        middlewares.unshift({
          name: 'first-in-array',
          path: '/foo/path',
          middleware: (req, res) => {
            res.send('Foo!');
          },
        });

        // Run a middleware after all others
        middlewares.push({
          name: 'hello-world-test-one',
          path: '/foo/bar',
          middleware: (req, res) => {
            res.send('Foo Bar!');
          },
        });

        return middlewares;
      },
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: 'single',
    },

    performance: {
      hints: isDev ? false : 'warning',
    },
  };
};