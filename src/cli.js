#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
import {mdLinks} from '../src/index.js';
import chalk from 'chalk';

const inputsTerminal = process.argv;
const inputArgPath = inputsTerminal[2];
const options = [inputsTerminal[3], inputsTerminal[4]];

if(inputArgPath) {
    if(inputsTerminal.length === 3){
        mdLinks(inputArgPath, { validate: false, stats: false })
        .then((res)=>{res.forEach((e)=>{
            const answerCli = console.log(`${e.file} \n${chalk.blue(e.href)} \n${chalk.yellow(e.text)}`);
        return answerCli;
    })})
    .catch((err)=>console.log(err));
    } else if (inputsTerminal.length === 4){
        if (options.includes('--validate')){
            mdLinks(inputArgPath, { validate: true, stats: false })
            .then((res)=>{res.forEach((e)=>{
                const answerCli = console.log(`${e.file} \n${chalk.blue(e.href)} \n${chalk.bold.magenta(e.message)} ${chalk.bold.green(e.status)}  \n${chalk.yellow(e.text)}`);
            return answerCli;
        })})
        .catch((err)=>console.log(err));
        } else if (inputsTerminal.length === 4){
            if (options.includes('--stats')){
                mdLinks(inputArgPath, { validate: false, stats: true })
                .then((res)=>console.log(chalk.blue(res)))
                .catch((err)=> console.log(err));
            }
        } else {
            console.log(chalk.red('Error: La opción ingresada no es válida. Opciones permitidas: --validate o --stats'));
        }
    } else if(inputsTerminal.length === 5 && options.includes('--validate') && options.includes('--stats')){
        mdLinks(inputArgPath, { validate: true, stats: true })
        .then((res)=>console.log(chalk.green(res)))
        .catch((err)=> console.log(err));
    } else {
        console.log(chalk.red('Error: La opción ingresada no es válida. Opciones permitidas: --validate o --stats'));
    }
} else {
    console.log(chalk.red('Error: Debe ingresar una ruta. Vuelva a intentarlo'));
}