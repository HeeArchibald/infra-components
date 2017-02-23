//module.exports = require('./config/webpack.dev.js');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        'infra-components': './index.ts'
    },
    output: {
        path: './dist',
        filename: '[name].js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: [
                'file?name=[name].js',
                'awesome-typescript-loader?tsconfig=tsconfig.json',
                'angular2-template-loader'
            ]
        }, {
            test: /\.(html|css)$/,
            loader: 'raw-loader'
        }]
    },
    /*
    externals: {
        '@angular/core': '@angular/core',
        '@angular/common': '@angular/common',
        '@angular/forms': '@angular/forms',
        'rxjs/Subject': 'rxjs/Subject',
        'rxjs/add/operator/debounceTime': 'rxjs/add/operator/debounceTime',
        'rxjs/add/operator/distinctUntilChanged': 'rxjs/add/operator/distinctUntilChanged'
    },*/
    externals: [
        /^[a-z\/\-0-9@]+$/i
    ],
    plugins: []
}