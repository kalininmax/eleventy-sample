const esbuild = require('esbuild');
const PATHS = require('../../paths');

const isProd = process.env.ELEVENTY_ENV === 'production';

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = async (config) => {
	config.addTemplateFormats('js');
	config.addExtension('js', {
		outputFileExtension: 'js',
		compile: async (file, path) => async () => {
			await esbuild.build({
				target: 'es2022',
				entryPoints: ['./src/assets/scripts/index.js'],
				entryNames: '[dir]/bundle',
				minify: isProd,
				bundle: true,
				write: true,
				sourcemap: true,
				outbase: PATHS.src.root,
				outdir: PATHS.build.root,
			});
		},
	});
};
