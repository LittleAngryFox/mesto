const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/pages/index.js",

    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
            },

            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                       loader: 'css-loader',
                        options: { 
                            importLoaders: 1,
                         },
                    },
                    'postcss-loader',
                ],
            },

            {
                test: /\.html$/,
                loader: 'html-loader',
            },

            {
                test: /\.(png|svg|jpg|gif|woff2|woff)$/,
                loader: 'file-loader',
            },

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin(),

    ],
    //devtool: "inline-source-map",
     mode: "production"
};