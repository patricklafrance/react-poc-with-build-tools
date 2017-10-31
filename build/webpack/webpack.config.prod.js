// TODO: Optimize images
// TODO: Autoprefixer

const path = require("path");

const webpack = require("webpack");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

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
    // Don't attempt to continue if there are any errors.
    bail: true,
    entry: [
        require.resolve("babel-polyfill"),
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
                    // The notation here is somewhat confusing.
                    // "postcss" loader applies autoprefixer to our CSS.
                    // "css" loader resolves paths in CSS and adds assets as dependencies.
                    // "style" loader normally turns CSS into JS modules injecting <style>,
                    // but unlike in development configuration, we do something different.
                    // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
                    // (second argument), then grabs the result CSS and puts it into a
                    // separate file in our build process. This way we actually ship
                    // a single CSS file in production instead of JS code injecting <style>
                    // tags. If you use code splitting, however, any async bundles will still
                    // use the "style" loader inside the async code so CSS from them won't be
                    // in the main CSS file.
                    {
                        test: /\.scss$/,
                        loader: ExtractTextPlugin.extract({
                            fallback: require.resolve("style-loader"),
                            use: [
                                {
                                    loader: "css-loader",
                                    options: {
                                        modules: true,
                                        importLoaders: 1,
                                        localIdentName :"[path]___[name]__[local]",
                                        camelCase: "dashesOnly",
                                        minimize: true
                                    }
                                },
                                {
                                    loader: require.resolve("postcss-loader"),
                                    options: {
                                        // Necessary for external CSS imports to work
                                        // https://github.com/facebookincubator/create-react-app/issues/2677
                                        ident: "postcss",
                                        plugins: () => [
                                            autoprefixer({
                                                browsers: ["last 2 versions"]
                                            })
                                        ]
                                    }
                                },
                                {
                                    loader: "sass-loader"
                                }
                            ]
                        })
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
              }
        }),
        // It is absolutely essential that NODE_ENV was set to production here.
        // Otherwise React will be compiled in the very slow development mode.
        new webpack.DefinePlugin({
            "ENV": JSON.stringify("production"),
            "DEBUG": false,
            "process.env":{
              "NODE_ENV": JSON.stringify("production")
            }
        }),
        // Minify the code.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebookincubator/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false
            },
            output: {
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebookincubator/create-react-app/issues/2488
                ascii_only: true
            }
        }),
        // Extract the CSS into a file.
        new ExtractTextPlugin({
            filename: `${paths.staticFilesPath}/css/[name].css`,
        })
    ]
};
