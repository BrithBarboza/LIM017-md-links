import {
	transformPathAbsolute,
	verifyPathExist,
	verifyIsFile,
	verifyIsDirectory,
	recognizePathExtension,
	readDirectory,
	arrayListFile,
	filterbyExtension,
	searchingLinks,
	infoStats,
	totalInfo
} from '../src/utils.js';

describe('transformPathAbsolute', () => {
	it('shoul resolve path in windows', () => {
		expect(transformPathAbsolute('README.md')).toBe('C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos-Laboratoria\\LIM017-md-links\\README.md');
	});
});

describe('verifyPathExist', () => {
	it('verify that path exist', () => {
		expect(verifyPathExist('README.md')).toBe(true);
	});
	it('If path doesnt exist: Show err', () => {
		const roote = 'README.js';
		expect(verifyPathExist(roote)).toEqual(false);
	});
});

describe('verifyIsFile', () => {
	it('verify that is file', () => {
		expect(verifyIsFile('README.md')).toBe(true);
	});
	it('If is not a file: return false', () => {
		expect(verifyIsFile('./src')).toEqual(false);
	});
});

describe('verifyIsDirectory', () => {
	it('verify that is directory', () => {
		expect(verifyIsDirectory('./files')).toBe(true);
	});
	it('If is not a directory: return false', () => {
		expect(verifyIsDirectory('README.md')).toEqual(false);
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
		'folder4',
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
		  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos-Laboratoria\\LIM017-md-links\\files\\folder2\\archivo3.md'
		}
	  ]

	it('Searching links and get object', () => {
		expect(searchingLinks('./files/folder2')).toEqual(fourthArrayTest);
	});

	it('If there is not link, return empty object', () => {
		expect(searchingLinks('./files/folder3')).toEqual([]);
	});

});

describe('Get infoStats to file', ()=>{
	const bri = [
		{
		  href: 'https://www.google.com/',
		  text: '1° link',
		  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\archivo0.md',
		  status: 200,
		  message: 'Ok'
		},
		{
		  href: 'https://www.googl.com/',
		  text: '2° link',
		  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\archivo0.md',
		  status: 500,
		  message: 'Fail'
		}
	  ]; 
	  
	  const result = `Total Links: ${2} \nUnique Links:  ${2}`;
	it('Get infoStats', () => {
		expect(infoStats(bri)).toEqual(result)
	})
})

describe('Get totalInfo to file', ()=>{
	const bri = [
		{
		  href: 'https://www.google.com/',
		  text: '1° link',
		  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\archivo0.md',
		  status: 200,
		  message: 'Ok'
		},
		{
		  href: 'https://www.googl.com/',
		  text: '2° link',
		  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\archivo0.md',
		  status: 500,
		  message: 'Fail'
		}
	  ]; 
	  
	  const result = `Total Links: ${2} \nUnique Links:  ${2} \nBroken Links:  ${1}`;
	it('Get totalInfo', () => {
		expect(totalInfo(bri)).toEqual(result)
	})
})

