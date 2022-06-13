/* eslint-disable prefer-promise-reject-errors */
import {
    verifyPathExist,
    transformPathAbsolute,
    verifyIsDirectory,
    arrayListFile,
    filterbyExtension,
    searchingLinks,
    infoStats,
    totalInfo
} from '../src/utils.js';
import { getStatusLinks } from '../src/validate.js'

export const mdLinks = (argPath, options = { validate: false, stats: false }) => {
    return new Promise((resolve, reject) => {
        if (verifyPathExist(argPath)) {
            let arrayContent = [];
            argPath = transformPathAbsolute(argPath);
            if (verifyIsDirectory(argPath)) {
                const listFileOfDirectory = arrayListFile(argPath);
                if (listFileOfDirectory.length > 0) {
                    const filesMd = filterbyExtension(listFileOfDirectory);
                    if (filesMd.length > 0) {
                        const arrayContent2 = searchingLinks(argPath);
                        arrayContent = arrayContent2;
                    } else {
                        reject('No existen archivos Markdown(.md)');
                    }
                } else {
                    reject('No existen archivos en el directorio');
                }
            } else {
                reject('La ruta ingresada no es un directorio. Ingrese una válida.');
            }

            if (arrayContent.length > 0) {
                if (options.validate && options.stats) {
                    getStatusLinks(arrayContent)
                        .then((res) => resolve(totalInfo(res, options)));
                } else if (options.validate && !options.stats) {
                    getStatusLinks(arrayContent)
                        .then((res) => resolve(res));
                } else if (!options.validate && options.stats) {
                    getStatusLinks(arrayContent)
                        .then((res) => resolve(infoStats(res, options)));
                } else {
                    resolve(arrayContent);
                }
            } else {
                reject('No se ha encontrado ningún link.');
            }
        } else {
            reject('La ruta ingresada no existe.');
        }
    });
}