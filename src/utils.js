import path from 'path';
import fs from 'fs';

export const transformPathAbsolute = argPath =>
	path.isAbsolute(argPath) ? argPath : path.resolve(argPath);

export const verifyPathExist = argPath =>
	fs.existsSync(transformPathAbsolute(argPath));

export const verifyIsFile = argPath => fs.lstatSync(argPath).isFile();

export const verifyIsDirectory = argPath => fs.lstatSync(argPath).isDirectory();

export const recognizePathExtension = argPath => path.extname(argPath);

export const readDirectory = argPath => fs.readdirSync(argPath);

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

export const filterbyExtension = arrayList => {
	const listMd = arrayList.filter(
		newFiles => recognizePathExtension(newFiles) === '.md'
	);
	return listMd;
};

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