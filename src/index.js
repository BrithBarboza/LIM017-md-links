/* eslint-disable prefer-promise-reject-errors */
import {
    verifyPathExist,
    transformPathAbsolute,
    verifyIsDirectory,
    arrayListFile,
    filterbyExtension,
} from '../src/utils.js';
const mdLinks = (argPath, options) => {
    return new Promise((resolve, reject) => {
        if (verifyPathExist(argPath) === true) {
            argPath = transformPathAbsolute(argPath);
            let arrayContent = [];
            if (verifyIsDirectory(argPath) === true) {
                const listFileOfDirectory = arrayListFile(argPath);
                if (listFileOfDirectory.length > 0) {
                    const filesMd = filterbyExtension(listFileOfDirectory);
                    arrayContent = filesMd;
                } else {
                    reject('No existen archivos Markdown(.md)');
                }
                /* console.log(arrayContent); */
            }
        }
    });

}
mdLinks(process.argv[2])
    .then((res) => { console.log(res) })
    .catch((error) => { console.log(error) });