const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isDevelopment = env === "development";
const isProduction = env === "production";

module.exports = {
    isDevelopment,
    isProduction
};
