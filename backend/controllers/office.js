exports.office_list = Office => async (req, res, next) => {
	const list = await Office.find({}, "ip numb adress ");
	res.send(list);
}

exports.office_details = (Office, User) => async (req, res, next) => {
	const office = await Office.findById(req.params.officeId)
		.populate([
			{
				path: "comments", populate: { path: "author", model: User, select: 'login' }
			},
			{
				path: "users", model: User, select: 'login hardware'
			}
		]);
	/* 	.populate({
			path: 'comments', populate: {		
				path: 'author',
				model: User,
				select: 'login',
			}
		}) 
		console.log('office',office);*/
	res.send(office);
}

exports.office_update = (Office, User) => async (req, res, next) => {
	try {
		Office.findByIdAndUpdate(req.params.officeId, req.body, { returnDocument: 'after' })
			.populate([
				{
					path: "comments", populate: { path: "author", model: User, select: 'login' }
				},
				{
					path: "users", model: User, select: 'login hardware'
				}
			]).then(office => res.send(office))
	} catch (err) { next(err); }
}

exports.link_post = (Office) => async (req, res, next) => {
	const office = await Office.findByIdAndUpdate(req.params.officeId, {
		$push: {
			'links': {
				title: req.body.title,
				url: req.body.url
			}
		}
	}, { new: true });
	res.send(office.links);
}

exports.link_delete = (Office) => async (req, res, next) => {
	const office = await Office.findByIdAndUpdate(req.params.officeId, {
		$pull: {
			'links':
				{ _id: req.params.linkId }
		}
	}, { new: 'true' });
	res.send(office.links);
}

exports.comment_post = (Office, User) => async (req, res, next) => {

	const office = await Office.findByIdAndUpdate(req.params.officeId, {
		$push: {
			"comments": {
				text: req.body.comment,
				"author": {
					_id: req.user.id
				}
			}
		}
	}, { new: true })
	await office.populate({
		path: 'comments', populate: {
			path: 'author',
			model: User,
			select: 'login'
		}
	});

	res.send(office.comments);
}

exports.comment_delete = (Office, User) => async (req, res, next) => {

	const office = await Office.findByIdAndUpdate(req.params.officeId, {
		$pull: {
			'comments': {
				_id: req.params.commentId
			}
		}
	}, { new: true })
		.populate({
			path: "comments", populate: { path: "author", model: User, select: 'login' }
		});

	res.send(office.comments);

}





