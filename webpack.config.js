const path = require('path');

module.exports = {
	mode: "production",
	 optimization: {
        minimize: false
    },
	entry: {
		app: "./js/index.js"
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	}
};