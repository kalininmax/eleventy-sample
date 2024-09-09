const HTML_CLASSLIST = document.documentElement.classList;

class ProjectApp {
	env: { [key: string]: boolean };
	utils: { [key: string]: Function };
	components: { [key: string]: Function };

	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.components = {
			Examples: require('../../includes/examples/examples').default,
		};

		window.addEventListener('load', () => {
			HTML_CLASSLIST.remove('_loading');
		});
	}
}

window.ProjectApp = new ProjectApp();
