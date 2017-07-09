/* global require */

var webpack = require('webpack');

//noinspection JSUnresolvedVariable
module.exports = {
    entry: './client/main.js',
    output: {
        path: __dirname,
        filename: './server/static/scripts/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {presets: ['es2015', 'react']}
                }],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    }
};
