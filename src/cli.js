#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
import {mdLinks} from '../src/index.js';

const inputsTerminal = process.argv;
const inputArgPath = inputsTerminal[2];
const options = [inputsTerminal[3], inputsTerminal[4]];

if(inputArgPath) {
    if(inputsTerminal.length === 3){
        mdLinks(inputArgPath, { validate: false, stats: false })
        .then((res)=>{res.forEach((e)=>{
            const answerCli = `${e.file} ${e.href} ${e.text}`;
        return console.log(answerCli);
    })})
    .catch((err)=>console.log(err));
    } else if (inputsTerminal.length === 4){
        if (options.includes('--validate')){
            mdLinks(inputArgPath, { validate: true, stats: false })
            .then((res)=>{res.forEach((e)=>{
                const answerCli = `${e.file} ${e.href} ${e.message} ${e.status}  ${e.text}`;
            return console.log(answerCli);
        })})
        .catch((err)=>console.log(err));
        } else if (inputsTerminal.length === 4){
            if (options.includes('--stats')){
                mdLinks(inputArgPath, { validate: false, stats: true })
                .then((res)=>console.log(res))
                .catch((err)=> console.log(err));
            }
        } else {
            console.log('Error: La opción ingresada no es válida. Opciones permitidas: --validate o --stats');
        }
    } else if(inputsTerminal.length === 5 && options.includes('--validate') && options.includes('--stats')){
        mdLinks(inputArgPath, { validate: true, stats: true })
        .then((res)=>console.log(res))
        .catch((err)=> console.log(err));
    } else {
        console.log('Error: La opción ingresada no es válida. Opciones permitidas: --validate o --stats');
    }
} else {
    console.log('Error: Debe ingresar una ruta. Vuelva a intentarlo');
}