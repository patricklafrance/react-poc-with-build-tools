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
    entry: appRoot,
    output: {
        path: outputRoot,
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
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
                        loader: require.resolve("babel-loader"),
                        options: {
                            compact: true
                        }
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            {
                                loader: "style-loader", // creates style nodes from JS strings
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: "css-loader", // translates CSS into CommonJS,
                                options: {
                                    modules: true,
                                    importLoaders: 1,
                                    localIdentName :"[path]___[name]__[local]",
                                    camelCase: "dashesOnly"
                                }
                            },
                            {
                                loader: "sass-loader" // compiles Sass to CSS
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
                            name: "assets/[name].[ext]"
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