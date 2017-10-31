// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", error => {
    throw error;
});

/////////////////////////////////////

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const webpackConfig = require("../webpack/webpack.config.prod");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");

const { paths } = require("../config");

const appIndex = path.resolve(paths.root, paths.app.index);
const publicRoot = path.resolve(paths.root, paths.publicRoot);
const outputRoot = path.resolve(paths.root, paths.outputRoot);

/////////////////////////////////////

function cleanOutputDirectory() {
    console.log("Cleaning the output directory...");

    fs.emptyDirSync(outputRoot);

    console.log("Ouput directory cleaned.");
}

function buildApp() {
    console.log("Compiling application...");

    const compiler = webpack(webpackConfig);

    return new Promise((resolve, reject) => {
        compiler.run((error, stats) => {
            if (error) {
                reject();
            }

            const messages = formatWebpackMessages(stats.toJson({}, true));

            if (messages.errors.length > 0) {
                // Only show the first error. Others are often indicative of the same problem, but confuse the reader with noise.
                console.log(chalk.red(messages.errors[0]));

                return reject();
            }

            console.log("Application compiled.");

            resolve();
        });
    });
}

function copyPublicFolder() {
    console.log("Copying the public folder...");

    fs.copySync(publicRoot, outputRoot, {
        dereference: true,
        filter: file => file !== appIndex
    });

    console.log("Public folder copied.");
}

/////////////////////////////////////

cleanOutputDirectory();

buildApp()
    .then(() => {
        copyPublicFolder();

        console.log(chalk.green("\nProduction bundled created successfully!\n"));
    })
    .catch(() => {
        process.exit(1);
    });
