export function normalizeOptions(
	options: { [key: string]: any },
	defaultOptions: { [key: string]: any },
) {
	Object.keys(defaultOptions).map((key) => {
		options[key] =
			options[key] === undefined ? defaultOptions[key] : options[key];
	});
	return options;
}
