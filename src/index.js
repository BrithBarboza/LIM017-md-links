import { transformPathAbsolute, verifyPathExist } from './utils.js';

const mdLinks = (argPath, options) =>
	new Promise((resolve, reject) => {
		if (verifyPathExist(argPath)) {
			transformPathAbsolute(argPath);
		}
	});

mdLinks(process.argv[2]);
