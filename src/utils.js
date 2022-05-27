import path from 'path';
import fs from 'fs';
// 1. Convertir una ruta relativa en absoluta
// isAbsolute: Verifica si la ruta es absoluta // resolve: Convierte una ruta relativa en una absoluta
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

// 9. Permite leer el contenido de los archivos.
export const searchingLinks = argPath => {
	const arrayListAll = arrayListFile(argPath);
	const arrayListMd = filterbyExtension(arrayListAll);
	/* const read = readFiles(); */
	// console.log('mundo', arrayLisMd);
	let arrayList2 = [];

	if (arrayListMd.lenght > 0) {
		arrayListMd.forEach(fileMd => {
			const newArray = fs.readFileSync(fileMd, 'utf8');
			console.log('Jammie', newArray);
		});
	}
};
console.log('holi', searchingLinks(process.argv[2]));
