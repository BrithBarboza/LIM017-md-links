import path from 'path';
import fs from 'fs';

export const getArgPathAbsolute = argPath =>
	path.isAbsolute(argPath) ? argPath : path.resolve(argPath);

