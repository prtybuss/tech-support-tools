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
	try {
		const tag = await Tag.findById(req.params.tagId);
		if (tag.offices.length <= 1) {
			await tag.deleteOne();  //если удалили последний офис в этом списке,
		} else {									// удаляем и сам тег
			await tag.offices.pull(req.params.officeId);
		}
		const office = await Office.findByIdAndUpdate(req.params.officeId, {
			$pull: { 'tags': req.params.tagId }
		}).populate({ path: 'tags', model: Tag, select: 'name' });
		res.send(office.tags);
	} catch (err) { next(err) }
}

