const path = require("path");

/////////////////////////////////////

const root = path.resolve(__dirname, "..");
const appRoot = "src/";
const publicRoot = "public/";
const buildRoot = "build/";
const semanticRoot = "semantic/";

const outputRoot = "dist/";

const paths = {
    app: {
        index: `${publicRoot}index.html`
    },
    root,
    appRoot,
    publicRoot,
    buildRoot,
    semanticRoot,
    outputRoot,
    staticFilesPath: "static/"
};

/////////////////////////////////////

const devServerConfig = {
    port: 3000,
    // host: "0.0.0.0",
    host: "local.yeti.com",
    https: true,
    open: false,
    publicPath: "/"
};

/////////////////////////////////////

module.exports = {
    paths,
    devServerConfig
};
