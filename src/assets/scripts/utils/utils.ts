const utils: { [key: string]: Function } = {
	/**
	 * Debounces a function.
	 *
	 * @param {() => any} func - The function to debounce.
	 * @param {number} delay - The delay in milliseconds.
	 * @returns {() => any} - The debounced function.
	 */
	debounce(func: () => any, delay: number = 250): () => any {
		let timeoutId: NodeJS.Timeout | null;

		return (...args): any => {
			timeoutId && clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
		};
	},

	/**
	 * Throttles a function.
	 *
	 * @param {() => any} func - The function to throttle.
	 * @param {number} limit - The time limit in milliseconds.
	 * @returns {() => any} - The throttled function.
	 */
	throttle(func: () => any, limit: number): () => any {
		let inThrottle: boolean;
		return (...args): any => {
			if (!inThrottle) {
				func(...args);
				inThrottle = true;
				setTimeout(() => (inThrottle = false), limit);
			}
		};
	},

	/**
	 * Formats a number with spaces every 3 digits.
	 *
	 * @param {number} number - The number to format.
	 * @return {string} The formatted number.
	 */
	formatNumber(number: number): string {
		return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
	},

	/**
	 * Returns the appropriate title string based on the given number and the array of titles.
	 *
	 * @param {number} number - The number to determine the case of the title.
	 * @param {string[]} titles - An array of title strings, where the index determines the case.
	 * @return {string} The appropriate title string.
	 */
	declOfNum(number: number, titles: string[]): string {
		const cases: number[] = [2, 0, 1, 1, 1, 2];
		const index =
			number % 100 > 4 && number % 100 < 20
				? 2
				: cases[number % 10 < 5 ? number % 10 : 5];
		return titles[index];
	},
};

export default utils;
