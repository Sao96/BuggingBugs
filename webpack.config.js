const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: { "^/api$": "" },
                changeOrigin: true,
            },
        },
    },
    entry: {
        main: ["babel-polyfill", path.join(__dirname, "src", "index.js")],
    },
    output: {
        path: path.join(__dirname, "server/", "build/"),
        publicPath: "/build/",
        filename: "main.js",
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    resolve: {
        alias: {
            react: path.resolve("./node_modules/react"),
            svg: path.resolve("./src/svg/"),
            reduxitems: path.resolve("./src/reduxitems/"),
            util: path.resolve("./src/util/"),
            routes: path.resolve("./src/routes/"),
            actions: path.resolve("./src/actions/"),
            reducers: path.resolve("./src/reducers/"),
            initialstates: path.resolve("./src/initialstates/"),
            fields: path.resolve("./src/fields/"),
            img: path.resolve("./src/img"),
            routes: path.resolve("./src/routes/"),
            altTexts: path.resolve("./src/util/altTexts"),
            themeColors: path.resolve("./src/util/themeColors"),
            navRoutes: path.resolve("./src/routes/navRoutes"),
            apiRoutes: path.resolve("./src/routes/apiRoutes"),
            apiCalls: path.resolve("./src/util/apiCalls"),
            helperFunctions: path.resolve("./src/util/helperFunctions"),
            oauth2: path.resolve("./src/oauth2"),
            styles: path.resolve("./src/util/styles"),
            globalStyles: path.resolve("./src/util/styles"),
            globalHelperFunctions: path.resolve("./src/util/helperFunctions"),
            buttons: path.resolve("./src/util/components/buttons"),
            responseBoxes: path.resolve("./src/util/components/responseBoxes"),
            modal: path.resolve("./src/util/components/modal"),
            statusCodes: path.resolve("./src/util/statusCodes"),
        },
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: "ttf-loader",
                        options: {
                            name: "./font/[hash].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(png|woff|woff2|eot)$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
};
