// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", error => {
    throw error;
});

/////////////////////////////////////

const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { choosePort } = require("react-dev-utils/WebpackDevServerUtils");
const openBrowser = require("react-dev-utils/openBrowser");

const { devServerConfig } = require("../config");
const webpackConfig = require("../webpack/webpack.config.dev");
const createWebpackDevServerConfig = require("../webpack/webpack.dev-server.config");

const url = require("url");

/////////////////////////////////////

function formatUrl(isHttps, host, port) {
    const prettyHost = (host === "0.0.0.0" || host === "::") ? "localhost" : host;

    return url.format({
        protocol: isHttps ? "https" : "http",
        hostname: prettyHost,
        port,
        pathname: "/"
    });
}

/////////////////////////////////////

choosePort(devServerConfig.host, devServerConfig.defaultPort)
    .then(port => {
        if (port == null) {
            return;
        }

        // Retrieve the webpack dev server configuration with the chosen port.
        const serverConfig = createWebpackDevServerConfig(port);

        // Create a webpack compiler
        const compiler = webpack(webpackConfig);

        // Serve webpack assets generated by the compiler over a web sever.
        const server = new WebpackDevServer(compiler, serverConfig);

        // Launch webpack dev server.
        server.listen(serverConfig.port, serverConfig.host, error => {
            if (error) {
                return console.log(error);
            }

            console.log(chalk.cyan("Starting the development server...\n"));

            // The webpack dev server open option doesn't work as of now, this is our fallback.
            if (devServerConfig.open !== false) {
                openBrowser(formatUrl(serverConfig.https, serverConfig.host, serverConfig.port));
            }
        });

        // SIGINT = Interrupt from keyboard
        // SIGTERM = Termination signal
        ["SIGINT", "SIGTERM"].forEach(signal => {
            process.on(signal, function() {
                server.close();
                process.exit();
            });
        });
    })
    .catch(error => {
        if (error && error.message) {
            console.log(error.message);
        }

        process.exit(1);
    });


