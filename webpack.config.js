const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// webpack.config.js
const path = require('path')

module.exports = {
    entry: ['./public/**/*.js'],
    output: {
        path: path.resolve(__dirname, "dist"), // string
		filename: './public/custom.js'
    },
    mode: 'development'
}
