module.exports = {
	preset: 'jest-expo',
	testPathIgnorePatterns: [
		'/node_modules',
		'/android',
		'/ios',
		'/public',
		'/.expo',
	],
	setupFilesAfterEnv: [
		'@testing-library/jest-native/extend-expect',
		'jest-styled-components',
	],
};
