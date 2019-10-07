const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: {
		core: "./packages/core/lib/core.js",
		ui: "./packages/ui/lib/ui.js"
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ["babel-loader", "eslint-loader"]
		}]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "rzl-[name].js",
		library: ["Rzl","[name]"],
		libraryTarget: "umd"
	},
	plugins: [
		new CleanWebpackPlugin()
	]
};
