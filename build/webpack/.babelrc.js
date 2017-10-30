const env = require("../env");

const plugins = [
    require.resolve("react-hot-loader/babel"),
    require.resolve("babel-plugin-transform-object-rest-spread"),
    require.resolve("babel-plugin-transform-class-properties")
];

if (env.isDevelopment) {
    // The following two plugins are currently necessary to make React warnings
    // include more valuable information. They are included here because they are
    // currently not enabled in babel-preset-react.
    plugins.push.apply(plugins, [
        // Adds component stack to warning messages.
        require.resolve("babel-plugin-transform-react-jsx-source"),
        // Adds __self attribute to JSX which React will use for some warnings.
        require.resolve("babel-plugin-transform-react-jsx-self"),
    ]);
}

module.exports = {
    presets: [require.resolve("babel-preset-react") ],
    plugins: plugins
};
