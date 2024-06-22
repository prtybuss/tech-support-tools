const path = require('node:path');
const fs = require('fs');
const openDir = require('../utils/openDir');
const AppError = require('../utils/appError');

exports.img_get = (Office) => async (req, res, next) => {
	try {
		const office = await Office.findById(req.params.officeId);
		const img = await office.imgs.id(req.params.imgId);
		const dir = await path.join(__dirname, img.path);
		if (!img) {
			return next(
				new AppError(401, "fail", "img wasnt found"));
		}
		res.status(200).download(img.name, { root: dir }, function (err) {
			if (!err) return; // file sent
			if (err.status !== 404) return next(err); // non-404 error
			res.statusCode = 404;
			res.send('Cant find that file, sorry!');
		});
	} catch (err) { next(err) }
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
	const { soundDir } = User.findById(req.params.userId);
	const filePath = (req.params.dir ? req.params.dir + '\\' : '') + req.params.file;
	const fullPath = path.join(`${soundDir}\\`, filePath);
	const readStream = fs.createReadStream(fullPath, {
		emitClose: false
	});
	readStream.on('error', function (err) {
		res.end(err);
	});
	readStream.pipe(res);
}

exports.files_list = (Office, User) => async (req, res, next) => {

	try {
		const { soundDir } = await User.findById(req.params.userId);
		const subfolder = req.params.dir ?? '';
		if (!soundDir) {
			return next(
				new AppError(401, "fail", "sound dir does not configurated for this userId"));
		}
		const dirpath = path.join(`${process.env.SHARED_FILES_DIR}${soundDir}/`, subfolder);
		console.log('dirpath', dirpath);
		openDir(dirpath, req, res, next);
	} catch (err) { next(err); }


} 