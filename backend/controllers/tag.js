exports.tag_list = Tag => async (req, res, next) => {
	try {
		const list = await Tag.find({}, 'name');
		res.send(list)
	} catch (err) { next(err); }
}
exports.tag_details = (Office, Tag) => async (req, res, next) => {
	try {
		const list = await Tag.findById(req.params.tagId)
			.populate({ path: "offices", model: Office, select: 'numb adress' });
		res.send(list.offices);
	} catch (err) { next(err); }
}
exports.tag_post = (Office, Tag) => async (req, res, next) => {
	const office = await Office.findById(req.params.officeId);
	if (req.body.tagId) {   /* если тег уже создан */
		/* проверим его наличие в указаном документе */
		if (office.tags.indexOf(req.body.tagId) !== -1) {
			res.send('already exist');
		} else {
			office.tags.push(req.body.tagId);
			office.save();
			await Tag.findByIdAndUpdate(req.body.tagId, {
				$push: { 'offices': req.params.officeId }
			})
			res.send(office.tags);
		};
	}
	else { /* иначе создаем и добавляем */
		const new_tag = await Tag.create({
			name: req.body.name,
			offices: [office._id]
		})
		await office.tags.push(new_tag.id);
		office.save();
		res.send(new_tag);
	};
}

exports.tag_delete = (Office, Tag) => async (req, res, next) => {
	console.log('req.params:', req.params);


	try {
		const office = await Office.findById(req.params.officeId);
		console.log('office.tags', office.tags);
		office.tags.pull(req.params.tagId);
		office.save();
		console.log('office.tags', office.tags);

		const tag = await Tag.findById(req.params.tagId)
		console.log('tag.offices', tag.offices);
		if (tag.offices.length <= 1) tag.deleteOne()
		else {
			tag.offices.pull(req.params.officeId)
			tag.save()
		}
		
		console.log('tag.offices', tag.offices);
		res.send(office.tags);
	} catch (err) { next(err) }
}

