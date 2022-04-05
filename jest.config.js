module.exports = {
	preset: 'jest-expo',
	testPathIgnorePatterns: [
		'/node_modules',
		'/android',
		'/ios',
		'/public',
		'/.expo',
		'/scripts',
	],
	setupFilesAfterEnv: [
		'@testing-library/jest-native/extend-expect',
		'jest-styled-components',
		'./path/to/jestSetupFile.js',
	],
};
