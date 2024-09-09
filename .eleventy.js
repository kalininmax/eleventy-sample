const yaml = require('js-yaml');
const markdownIt = require('markdown-it');

const shortcodes = require('./src/shortcodes');
const PATHS = require('./paths');
const md = new markdownIt({
	html: true,
});

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = (config) => {
	config.ignores.add('src/components');

	Object.keys(shortcodes).forEach((name) =>
		config.addShortcode(name, shortcodes[name]),
	);

	config.addFilter('debug', (...args) => console.log(...args));
	config.addFilter('url', (str) => process.env.SITE_URL + str);
	config.addFilter('stringify', (data) => JSON.stringify(data, null, '\t'));
	config.addFilter('markdown', (content) => {
		return md.render(content);
	});

	config.addDataExtension('yml', (content) => yaml.load(content));

	config.addPlugin(require('./src/config/eleventy.config.styles'));
	config.addPlugin(require('./src/config/eleventy.config.scripts'));
	config.addPlugin(require('./src/config/eleventy.config.formatter'));
	config.addPlugin(require('./src/config/eleventy.config.svg'));
	config.addPlugin(require('./src/config/async-optimize-img'));

	config.addGlobalData('env', require('dotenv').config().parsed);

	PATHS.src.copy.forEach((path) => config.addPassthroughCopy(path));

	config.addWatchTarget('./src/**/*.*');

	return {
		dir: {
			input: PATHS.src.root,
			includes: PATHS.src.includes,
			layouts: PATHS.src.layouts,
			data: PATHS.src.data,
			output: PATHS.build.root,
		},
	};
};
