
'use strict';

const webpack = require('webpack');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: path.join(__dirname, 'app/bundles/'),

    entry: {
        index: './index/index.js'
    },

    output: {
        path: path.join(__dirname, 'public/js'),
        filename: '[name].js',
        library: '[name]'
    },

    devtool: 'cheap-inline-module-source-map',

    module: {
      loaders: [
        {
          test:   /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.scss$/,
          loaders: ['styles', 'css', 'sass']
        }
      ]
    },

    plugins: [
        //new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            blocks: path.join(__dirname, 'app/blocks')
        })
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
    },

    externals: {
        jquery: "$",
    },
}

