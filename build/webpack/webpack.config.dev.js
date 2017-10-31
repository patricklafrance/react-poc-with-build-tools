// TODO:
// SASS
// Semantic UI
// Linters (ESLint, stylelint, jsx ally)
// Babel
// Images (+ optimization)
// Text replacement in files
// Copy assets

// HMR (Missing for React code)
// Tests
// Compile semantic UI

// NOTE: Good documentation about HMR setup: https://gaearon.github.io/react-hot-loader/getstarted/

// Maybe solution for webpack + gulp for semantic: https://github.com/Browsersync/recipes/tree/master/recipes/webpack.react-hot-loader

// TODO: Maybe we can avoid scripts/dev.js and webpack.dev-server.config.js and only configure webpack.config.dev.js.

const path = require("path");
const webpack = require("webpack");

const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");

const { paths, devServerConfig } = require("../config");

/////////////////////////////////////

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = devServerConfig.publicPath;

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html`. Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = devServerConfig.publicPath.replace(/\/$/, "");

const appRoot = path.resolve(paths.root, paths.appRoot);
const appIndex = path.resolve(paths.root, paths.app.index);
const nodeRoot = path.resolve(paths.root, "node_modules");
const outputRoot = path.resolve(paths.root, paths.outputRoot);

/////////////////////////////////////

module.exports = {
    entry: [
        require.resolve("babel-polyfill"),
        // React hot loader preserve the state of our components that use redux.
        require.resolve("react-hot-loader/patch"),
        // Include an alternative client for WebpackDevServer. A client's job is to
        // connect to WebpackDevServer by a socket and get notified about changes.
        // When you save a file, the client will either apply hot updates (in case
        // of CSS changes), or refresh the page (in case of JS changes). When you
        // make a syntax error, this client will display a syntax error overlay.
        require.resolve("react-dev-utils/webpackHotDevClient"),
        // We include the app code last so that if there is a runtime error during
        // initialization, it doesn't blow up the WebpackDevServer client, and
        // changing JS code would still trigger a refresh.
        appRoot
    ],
    output: {
        path: outputRoot,
        filename: `${paths.staticFilesPath}js/[name].bundle.js`,
        chunkFilename: `${paths.staticFilesPath}js/[name].chunk.js`,
        publicPath: publicPath,
    },
    resolve: {
        extensions: [".js", ".json"],
        modules: [appRoot, nodeRoot],
        plugins: [
            // Prevents users from importing files from outside of src/ (or node_modules/).
            // This often causes confusion because we only process files within src/ with babel.
            // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
            // please link the files into your node_modules/ and let module-resolution kick in.
            // Make sure your source files are compiled, as they will not be processed in any way.
            new ModuleScopePlugin(appRoot, [nodeRoot])
        ]
    },
    devtool: "cheap-module-source-map",
    module: {
        strictExportPresence: true,
        rules: [
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    // Process JavaScript with Babel.
                    {
                        test: /\.js$/,
                        include: appRoot,
                        use: [
                            require.resolve("react-hot-loader/webpack"),
                            // The HMR is not stable right now if we add caching with the cacheDirectory options of the babel-loader.
                            require.resolve("babel-loader")
                        ]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            {
                                // Turns CSS into JS modules injecting <style>,
                                loader: "style-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                // Translates CSS files into CommonJS that can be imported in component.
                                loader: "css-loader",
                                options: {
                                    modules: true,
                                    importLoaders: 1,
                                    localIdentName :"[path]___[name]__[local]",
                                    camelCase: "dashesOnly"
                                }
                            },
                            {
                                // Compiles SASS to CSS.
                                loader: "sass-loader"
                            }
                        ]
                    },
                    // "file" loader makes sure those assets get served by WebpackDevServer.
                    // This loader doesn't use a "test" so it will catch all modules
                    // that fall through the other loaders.
                    {
                        // Exclude `js` files to keep "css" loader working as it injects
                        // it's runtime that would otherwise processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        loader: require.resolve("file-loader"),
                        options: {
                            name: `${paths.staticFilesPath}/img/[name].[ext]`
                        }
                    }
                ]
            }
        ]
    },
    // TODO: new webpack.DefinePlugin(env.stringified),
    plugins: [
        // Makes some environment variables available in index.html.
        new InterpolateHtmlPlugin({
            "PUBLIC_URL": publicUrl
        }),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: appIndex,
        }),
        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),
        // This is necessary to emit hot updates.
        new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don't have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        new WatchMissingNodeModulesPlugin(nodeRoot)
    ]
};
