'use strict';
const fs = require('fs');
const path = require('path');
const formatBytes = require('./formatBytes.js');
const AppError = require('./appError.js');


module.exports = async (dirpath, req, res, next) => {
	console.log('dirpath',dirpath);
	const result = [];
	try {
		let dir = await fs.promises.opendir(dirpath);
		for await (let entry of dir) {
			let name = entry.name;
			if (entry.isDirectory()) {
				name += "/";
			}
			let stats = await fs.promises.stat(path.join(dirpath, name));
			let size = stats.size;
			let sizeShort = formatBytes(String(size).padStart(10));
			let birth = stats.birthtime;
			let birthShort = birth.toTimeString().slice(0, 5);
			let file = {
				name: entry.name,
				isDirectory: entry.isDirectory(),
				size: sizeShort,
				date: birthShort,
			}
			result.push(file);
		}
		res.send(result);
	} catch (err) {
		err = new AppError(404, 'fail', `host ${dirpath} unreacheble`);
		next(err, req, res, next);
	}
};