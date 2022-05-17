import { getArgPathAbsolute } from '../src/utils.js';
const pathTest =
	'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\README.md';

describe('getArgPathAbsolute', () => {
	it('shoul resolve path in windows', () => {
		console.log(getArgPathAbsolute('README.md'));
		expect(getArgPathAbsolute('README.md')).toBe(pathTest);
	});
});

