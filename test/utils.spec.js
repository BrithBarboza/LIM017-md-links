import {
	transformPathAbsolute,
	verifyPathExist,
	verifyIsFile,
	verifyIsDirectory,
	recognizePathExtension,
	readDirectory,
	arrayListFile,
	filterbyExtension,
	searchingLinks
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
	const firstDirectoryTest = [
		'archivo0.md',
	    'folder1',
	    'folder2',
		'folder3',
	];
	it('verify that is directory', () => {
		expect(readDirectory('./files')).toEqual(firstDirectoryTest);
	});
});

describe('arrayListFile', () => {
	const secondDirectoryTest = [
		'files\\archivo0.md',
		'files\\folder1\\archivo1.md',
		'files\\folder1\\archivo2.md',
		'files\\folder2\\archivo3.md',
		'files\\folder2\\prueba.js',
		'files\\folder3\\archivo4.md',
	];
	it('Traverse the directory return list of File', () => {
		expect(arrayListFile('files')).toEqual(secondDirectoryTest);
	});
});

describe('filterbyExtension', () => {
	const filesInicial = [
		'files\\archivo0.md',
		'files\\folder1\\archivo1.md',
		'files\\folder1\\archivo2.md',
		'files\\folder2\\archivo3.md',
		'files\\folder2\\prueba.js',
	];

	const thirdArrayTest = [
		'files\\archivo0.md',
		'files\\folder1\\archivo1.md',
		'files\\folder1\\archivo2.md',
		'files\\folder2\\archivo3.md'
	];
	it('Filter files by .md extension', () => {
		expect(filterbyExtension(filesInicial)).toEqual(thirdArrayTest);
	});
});

describe('searchingLinks', () => {
	const fourthArrayTest = [
		{
		  href: 'https://www.youtbe.com/watch?v=Lub5qOmY4JQ',
		  text: 'Si nunca has hecho un diagrama de flujo revisa est',
		  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder2\\archivo3.md'
		}
	  ]

	it('Searching links and get object', () => {
		expect(searchingLinks('./files/folder2')).toEqual(fourthArrayTest);
	});

	it('If there is not link, return empty object', () => {
		expect(searchingLinks('./files/folder3')).toEqual([]);
	});

});
