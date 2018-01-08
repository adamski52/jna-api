const CleanWebpackPlugin = require("clean-webpack-plugin"),
      path = require("path"),
      outputDir = "dist",
      entryDir = "src";

module.exports = {
    entry: "./" + entryDir + "/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, outputDir)
    },
    plugins: [
        new CleanWebpackPlugin([outputDir])
    ],
    target: "node"
};
