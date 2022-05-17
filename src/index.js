// import fs from 'fs';
// import path from 'path';
import { getArgPathAbsolute } from './util.js';

// isAbsolute = Verifica si la ruta es absoluta
// resolve = Convierte una ruta relativa en una absoluta

const mdLinks = (argPath, options) => {
	if (!argPath) {
		// console.log('no hay path');
		return console.log('Ingrese un path');
	}
	return console.log(getArgPathAbsolute(argPath));
};
mdLinks(process.argv[2]);
