const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../src/'),
    entry: {
        client: './client/index.tsx',
    },
    mode: 'development',
    output:{
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/'
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
        }),
    ],
    devServer: {
        port: 3004,
        clientLogLevel: 'error',
        hot: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        proxy: {
            '/api': 'http://localhost:5003'
        }
    },
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/,
        poll: 2000,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                node_vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 1
                }
            }
        }
    },
    stats: {
        all: false,
        builtAt: true,
        colors: true,
        errors: true,
        timings: true,
        version: true,
        warnings: true,
    }
};
