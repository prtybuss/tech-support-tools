const AppError = require('../utils/appError');

exports.ticket_list = (Ticket) => async (req, res, next) => {
	try {
		if (req.user.role === "admin") {
			const all = await Ticket.find({});
			res.send(all);
		};
		if (req.user.role === "user") {
			let list = await Ticket.find({ participants: req.user.id });
			res.send(list);
		}
	} catch (err) { next(err); }
}
exports.message_read = (Ticket, Message) => async (req, res, next) => {
	try {
		await Message.updateMany({ ticket: req.params.id }, { status: 'viewed' });
		await Ticket.findByIdAndUpdate(req.params.id, { status: 'proceed' });
		res.status(201).json('Успех! все сообщения тикета прочитаны');;
	} catch (err) { next(err); }
}
exports.ticket_details = Ticket => async (req, res, next) => {
	try {
		const ticket = await Ticket.findById(req.params.id);
		const authorId = ticket.author;
		const participants = ticket.participants;
		if (req.user.role === "admin") {
			res.status(201).json({
				status: "success", ticket
			});
		}
		if ((req.user.role === "user") && ((req.user.id === authorId) || (participants.includes(req.user.id)))) {
			res.status(201).json({
				status: "success", ticket
			});
		}
	} catch (err) {
		next(err);
	}
}

exports.ticket_create = (Ticket, Message) => async (req, res, next) => {
	console.log('req.body', req.body);
	try {
		const message = await Message.create({
			text: req.body.text,
			author: req.user.id,
		});
		const ticket = await Ticket.create({
			theme: req.body.theme,
			author: req.user.id,
			authorName: req.body.authorName,
			office: req.user.office,
			participants: [req.user.id],
			messages: [message.id]
		});
		message.ticket = ticket.id;
		message.save();
		res.send(ticket);
	} catch (err) {
		next(err);
	}
}

exports.ticket_update = Ticket => async (req, res, next) => {
	console.log('.ticket_update: \n req.body:', req.body);
	try {
		const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body);
		res.status(200).json(ticket);//старый обьект в ответе
	} catch (err) {
		next(err);
	}
}
exports.ticket_delete = Ticket => async (req, res, next) => {
	try {
		const ticket = await Ticket.findById(req.params.id);
		if (ticket.author !== req.user.id) {
			return next(new AppError(404, "fail", "permission error"),
				req, res, next,);
		}
		await ticket.deleteOne();
		res.status(200).json('Успех!тикет удален');
	} catch (err) {
		next(err);
	}
}

