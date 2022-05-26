import {
	transformPathAbsolute,
	verifyPathExist,
	verifyIsFile,
	verifyIsDirectory,
	recognizePathExtension,
	readDirectory,
	arrayListFile,
} from '../src/utils.js';
const pathTest =
	'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\README.md';

describe('transformPathAbsolute', () => {
	it('shoul resolve path in windows', () => {
		console.log(transformPathAbsolute('README.md'));
		expect(transformPathAbsolute('README.md')).toBe(pathTest);
	});
});

describe('verifyPathExist', () => {
	it('verify that path exist', () => {
		expect(verifyPathExist(pathTest)).toBe(true);
	});
});

describe('verifyIsFile', () => {
	it('verify that is file', () => {
		expect(verifyIsFile('README.md')).toBe(true);
	});
});

describe('verifyIsDirectory', () => {
	it('verify that is directory', () => {
		expect(verifyIsDirectory('./files')).toBe(true);
	});
});

describe('recognizePathExtension', () => {
	it('Recognize which the path extension', () => {
		expect(recognizePathExtension('README.md')).toBe('.md');
	});
});

describe('readDirectory', () => {
	const FirstDirectoryTest = ['archivo0.md', 'folder1', 'folder2'];
	it('verify that is directory', () => {
		expect(readDirectory('./files')).toEqual(FirstDirectoryTest);
	});
});

describe('arrayListFile', () => {
	const SecondDirectoryTest = [
		'files\\archivo0.md',
		'files\\folder1\\archivo1.md',
		'files\\folder1\\archivo2.md',
		'files\\folder2\\archivo3.md',
		'files\\folder2\\prueba.js',
	];
	it('Traverse the directory return list of File', () => {
		expect(arrayListFile('files')).toEqual(SecondDirectoryTest);
	});
});
