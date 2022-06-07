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
import {getStatusLinks} from '../src/validate.js'

const mdLinks = (argPath, options = {validate: false, stats: false}) => {
    return new Promise((resolve, reject) => {
        let arrayContent = [];
        if (verifyPathExist(argPath) === true) {
            argPath = transformPathAbsolute(argPath);
            if (verifyIsDirectory(argPath) === true) {
                const listFileOfDirectory = arrayListFile(argPath);
                if (listFileOfDirectory.length > 0) {
                    const filesMd = filterbyExtension(listFileOfDirectory);
                    if(filesMd.length > 0){
                        const arrayContent2 = searchingLinks(argPath);
                        arrayContent = arrayContent2;
                    }else{
                        reject('El archivo no contiene links.');
                    }
                    return arrayContent;
                    /* console.log(arrayContent); */
                } else {
                    reject('No existen archivos Markdown(.md)');
                }
            } else{
                reject('La ruta ingresada no es un directorio. Ingrese una válida.');
            }
        } else {
            reject('La ruta ingresada no existe.');
        }
        /* console.log(arrayContent); */
        // If de validate y stats
        if (arrayContent.length > 0) {
            if (options.validate === true && options.stats === false){
                resolve(getStatusLinks(arrayContent));
            } else if (options.validate === false && options.stats === true){
                resolve(infoStats(arrayContent));
            } else if (options.validate === true && options.stats === true){
                resolve(totalInfo(arrayContent));
            } else {
                reject('Holi');
            }
        }
    });
}
mdLinks(process.argv[2])
    .then((res) => { console.log(res) })
    .catch((error) => { console.log(error) });