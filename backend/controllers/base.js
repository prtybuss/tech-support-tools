
exports.unauthorized = Office => async (req, res, next) => {
	console.log(req.ip);
	let i = req.ip.lastIndexOf('.');
	let reqIp = req.ip.substring(0, i) + '.*';
	let data;
	try {
		data = await Office.findOne({ 'ip': reqIp }, 'ip numb adress');
		if (data === null) data = { ip: req.ip };
	} catch (error) { next(error); }
	res.status(200).send(data);
};

