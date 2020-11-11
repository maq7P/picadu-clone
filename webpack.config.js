let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATH = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
}
let config = {
    // mode: 'development',
    entry: PATH.src + '/index.js',
    output: {
        path: PATH.dist,
        filename: '[name].[contenthash].js',
    },
    plugins: [
        // clear dist before assembly
        new CleanWebpackPlugin(),

        // add in dist html
        new HtmlWebpackPlugin({
            title: 'Pikadu — главная',
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new HtmlWebpackPlugin({
            title: 'Pikadu — Новый пост',
            template: path.resolve(__dirname, './src/new-post.html'), // шаблон
            filename: 'new-post.html', // название выходного файла
        }),
        // Нужен для вынесения в отдельный файл в dist 
        // new MiniCssExtractPlugin({
        //     filename: './assets/[name].css'
        // }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: PATH.src + '/assets/img',
                    to: './assets/img',
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                // MiniCssExtractPlugin.loader instead 'style-loader' if need in exact file in dist 
                use: ['style-loader', 'css-loader'],
            }, 
            {
                test: /\.(jpg|png|jpeg|svg|webp)$/i,
                use: ['file-loader'],
            },
        ],
    },
}

module.exports = config