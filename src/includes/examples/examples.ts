class Examples {
	container: HTMLElement | null;
	constructor() {
		this.container = document.querySelector('.examples');

		this.container && this.init();
	}

	init() {
		const counterButton = document.querySelector('[data-counter]');

		if (counterButton) {
			const buttonText = counterButton.textContent || '';
			let val = parseInt(counterButton.getAttribute('data-counter') || '0');

			counterButton.textContent = `${buttonText} ${val}`;
			counterButton.addEventListener('click', () => {
				counterButton.textContent = `${buttonText} ${++val}`;
				counterButton.setAttribute('data-counter', val.toString());
			});
		}
	}
}

export default new Examples();
