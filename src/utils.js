import path from 'path';
import fs from 'fs';
// 1. Convertir una ruta relativa en absoluta
export const transformPathAbsolute = argPath =>
	path.isAbsolute(argPath) ? argPath : path.resolve(argPath);
// console.log(transformPathAbsolute(process.argv[2]));
// 2. Verficar la existencia de la ruta
export const verifyPathExist = argPath =>
	fs.existsSync(transformPathAbsolute(argPath));
// console.log(transformPathAbsolute(process.argv[2]));
// 3. Verificar que sea archivo
export const verifyIsFile = argPath => fs.lstatSync(argPath).isFile();
// 4. Verificar que sea directorio
export const verifyIsDirectory = argPath => fs.lstatSync(argPath).isDirectory();
// console.log(verifyIsDirectory(process.argv[2]));
// 5. Identifiar la extensión de la ruta
export const recognizePathExtension = argPath => path.extname(argPath);
// 6. Permite leer los archivos de un directorio retornadolos en un array
export const readDirectory = argPath => fs.readdirSync(argPath);

// 7. Recorrer el directorio
export const arrayListFile = argPath => {
	let arrayList = [];
	if (verifyIsDirectory(argPath) === false) {
		arrayList.push(argPath);
	} else {
		readDirectory(argPath).forEach(file => {
			const filePath = path.join(argPath, file);
			arrayList = arrayList.concat(arrayListFile(filePath));
		});
	}
	return arrayList;
};
/* console.log(arrayListFile(process.argv[2])); */
// 8. Filtro de archivos .md
export const filterbyExtension = arrayList => {
	const listMd = arrayList.filter(
		newFiles => recognizePathExtension(newFiles) === '.md'
	);
	return listMd;
};
/* console.log(filterbyExtension(arrayListFile(process.argv[2]))); */

// 9. Permite obtener los links de los archivos y el array con href, text, file
export const searchingLinks = argPath => {
	const arrayListAll = arrayListFile(argPath);
	const arrayListMd = filterbyExtension(arrayListAll);
	const fullLinkOnlyRegex = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gm;
	const regExpURL = /\(((?:\/|https?:\/\/).*)\)/g;
	const regExpText = /\[(.*)\]/g;
	let arrayList2 = [];
	if (arrayListMd.length > 0) {
		arrayListMd.forEach(fileMd => {
			const readContentFile = fs.readFileSync(fileMd, 'utf8');
			const getLinks = readContentFile.match(fullLinkOnlyRegex);

			if (getLinks) {
				const destructureLink = getLinks.map(link => {
					const onlyLinkReturn = link.match(regExpURL).join().slice(1, -1);
					const onlyTextReturn = link.match(regExpText).join().slice(1, -1).substring(0, 50);
					return {
						href: onlyLinkReturn,
						text: onlyTextReturn,
						file: transformPathAbsolute(fileMd),
					};
				});
				arrayList2 = arrayList2.concat(destructureLink);
			}
		});
		return arrayList2;
	}
};
/* console.log('holi', searchingLinks(process.argv[2])); */

// 11. Return de option: stats y total
export const infoStats = (arrayListOfValidate) => {
	    const uniqueLinks = new Set(arrayListOfValidate.map((element) => element.href));
		const result = `Total Links: ${arrayListOfValidate.length} \nUnique Links:  ${uniqueLinks.size}`;
		return result;
}

export const totalInfo = (arrayListOfValidate) => {
	const brokenLinks = new Set(arrayListOfValidate.filter((element) => element.message === 'Fail'));
	const uniqueLinks = new Set(arrayListOfValidate.map((element) => element.href));
	const totalResult = `Total Links: ${arrayListOfValidate.length} \nUnique Links:  ${uniqueLinks.size} \nBroken Links:  ${brokenLinks.size}`;
	return totalResult;
}

/* const bri = [
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
	},
	{
	  href: 'https://es.wikpedia.org/wiki/Node.js',
	  text: 'Node.js - Wikipedia',
	  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo1.md',
	  status: 200,
	  message: 'Ok'
	},
	{
	  href: 'https://nodejs.org/es/about/',
	  text: 'Acerca de Node.js - Documentación oficial',
	  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo1.md',
	  status: 200,
	  message: 'Ok'
	},
	{
	  href: 'http://www.edu4java.com/es/web/web30.html',
	  text: 'Enlace no seguro',
	  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo1.md',
	  status: 200,
	  message: 'Ok'
	},
	{
		href: 'http://www.edu4java.com/es/web/web30.html',
		text: 'Enlace no seguro',
		file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo1.md',
		status: 200,
		message: 'Ok'
	  },
	{
	  href: 'https://github.com/workshopper/learnyounode',
	  text: 'learnyounode',
	  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo2.md',
	  status: 200,
	  message: 'Ok'
	},
	{
	  href: 'https://github.com/workshopper/how-to-npm',
	  text: 'how-to-npm',
	  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo2.md',
	  status: 200,
	  message: 'Ok'
	},
	{
	  href: 'https://github.com/stevekane/promise-it-wont-hurt',
	  text: 'promise-it-wont-hurt',
	  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo2.md',
	  status: 200,
	  message: 'Ok'
	},
	{
	  href: 'https://www.youtbe.com/watch?v=Lub5qOmY4JQ',
	  text: 'Si nunca has hecho un diagrama de flujo revisa est',
	  file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder2\\archivo3.md',
	  status: 500,
	  message: 'Fail'
	}
  ] */

  // console.log(infoStats(bri)); 