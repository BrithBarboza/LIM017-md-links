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
		const listMd = arrayList.filter((newFiles) => recognizePathExtension(newFiles) === '.md');
		return listMd;
};
/* console.log(filterbyExtension(arrayListFile(process.argv[2]))); */

// 9. Permite leer el contenido de los archivos.
/* export const readFiles = argPath => fs.readFile(argPath);
console.log(readFiles(process.argv[2])); */

/* export const searchingLinks = listMd => {
	let arrayList2 = [];
	if (readFiles())
}; */



/* fs.readFile('files/archivo0.md', 'utf-8', (error, data) => {
	if (!error) {
		console.log(data);
	} else {
		// eslint-disable-next-line no-template-curly-in-string
		console.log('Error: ${error}');
	}
}); */

export const fileContentShow = (argPath) => { fs.readFile(argPath,'utf-8', (err, data) => {
    if (err) throw err;
    else{console.log(data)};
	});
};
console.log(fileContentShow(process.argv[2]));

