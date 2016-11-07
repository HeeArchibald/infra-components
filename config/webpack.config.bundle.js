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
        path: './dist/bundle',
        filename: '[name].bundle.js',
        libraryTarget: 'umd',
        umdNamedDefine: 'infraComponents'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader?tsconfig=config/tsconfig.bundle.json', 'angular2-template-loader']
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
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].[hash].css')
    ]
}