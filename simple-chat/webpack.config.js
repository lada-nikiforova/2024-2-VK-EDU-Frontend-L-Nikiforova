'use strict';

const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
    context: SRC_PATH,
    entry: {
        index: './index.js',
        createChat: './js/createChat.js',
        openChat: './js/openChat.js', 
        storage: './js/storageList.js',
        button: './js/buttonChat.js'
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), 
        hot: true, 
        open: true, 
        openPage: 'pages.html',
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(ico|gif|png|jpe?g|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './img/',
                        publicPath: './img/',
                    },
                  }          
                ]
            },
            {
                test: /\.js$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        },
                    },
                ],
            },
            {
                test: /shadow\.css$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'css-loader'
                    },
                ],
            },
            {
                test: /index\.css$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCSSExtractPlugin({
            filename: 'style.css',
        }),
        new HTMLWebpackPlugin({
            filename: 'pages.html',
            template: './pages.html',
            chunks: ['createChat', 'storage', 'button']
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['index', 'openChat']
        })
        
    ]
};
