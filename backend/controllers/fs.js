const path = require('node:path');
const fs = require('fs');
const openDir = require('../utils/openDir');
const AppError = require('../utils/appError');

exports.img_get = (Office) => async (req, res, next) => {
	/* console.log('req for img', req.params); */
	const office = await Office.findById(req.params.officeId);
	const img = await office.imgs.id(req.params.imgId);
	const dir = path.join(__dirname, img.path);
	res.status(200).download(img.name, { root: dir }, function (err) {
		if (!err) return; // file sent
		if (err.status !== 404) return next(err); // non-404 error
		res.statusCode = 404;
		res.send('Cant find that file, sorry!');
	});
}
exports.img_post = (Office) => async (req, res, next) => {
	const office = await Office.findById(req.params.officeId);
	req.files.forEach(f => {
		office.imgs.push({
			name: f.filename,
			author: req.user.id
		})
	});
	office.save()
	res.send(office);
};
exports.audio_get = (Office, User) => async (req, res, next) => {
	const { soundDir } = await User.findById(req.params.userId);
	const office = await Office.findById(req.params.officeId);
	filePath = (req.params.dir ? req.params.dir + '/' : '') + req.params.file;
	const fullPath = path.join(`${office.fileServerIp}${soundDir}\\`, filePath);
	let readStream = fs.createReadStream(fullPath);
	readStream.pipe(res);
	res.status(200);
}

exports.files_list = (Office, User) => async (req, res, next) => {
	try {
		const dirpath = (process.env.NODE_ENV == "development")
			? path.join(`\\\\${process.env.FSHOST_FORDEV}\\arch-1\\`, (req.params.subfolder ?? '\\'))
			: (async () => {
				const { soundDir } = await User.findById(req.params.userId);
				if (!soundDir) {
					return next(
						new AppError(401, "fail", "sound dir does not configurated for this userId"));
				}
				const office = await Office.findById(req.params.officeId);
				const subfolder = req.params.subfolder ?? '';
				return path.join(`${office.fileServerIp}${soundDir}\\`, subfolder);
			})

		console.log('controller: \b', 'path is:', dirpath);
		let result = await openDir(dirpath, next)/* .then(r => console.log('r', r)) */
		res.send(result)
	} catch (err) { next(err) }

} 