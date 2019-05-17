const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../src/'),
    entry: {
        client: './client/index.tsx',
    },
    mode: 'production',
    output:{
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, '../dist/'),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['awesome-typescript-loader']
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|eot|ttf|woff2?)$/,
                loader: ['file-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
