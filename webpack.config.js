const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const reactVersion = require("react/package.json").version;
const reactDomVersion = require("react-dom/package.json").version;

module.exports = {
    entry: {
        main: "./src/index.js",
        // react: "react",
        // "react-dom": "react-dom",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js",
        chunkFilename: "[name].[contenthash].bundle.js",
        clean: true,
    },
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    // externals: {
    //     react: "React", // React will be available globally via the "React" variable
    //     "react-dom": "ReactDOM", // ReactDOM will be available globally via the "ReactDOM" variable
    // },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        splitChunks: {
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/]react[\\/]/,
                    name: `react-${reactVersion}`,
                    // chunks: "all",
                    enforce: true,
                },
                reactDom: {
                    test: /[\\/]node_modules[\\/]react-dom[\\/]/,
                    name: `react-dom-${reactDomVersion}`,
                    // chunks: "all",
                    enforce: true,
                },
            },
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new CleanWebpackPlugin(),
        new webpack.ids.HashedModuleIdsPlugin(),
    ],
};