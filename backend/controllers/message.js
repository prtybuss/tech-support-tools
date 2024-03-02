const AppError = require('../utils/appError');

exports.message_list = (Ticket, Message, User) => async (req, res, next) => {
  if (req.user.role === "admin") {
    await Ticket.findByIdAndUpdate(req.params.id, { status: 'proceed' });
  }
  try {
    const list = await Ticket.findById(req.params.id)
      .populate({
        path: 'messages', model: Message, populate: {
          path: 'author',
          model: User,
          select: 'login',
        }
      });
    res.send(list.messages);
  }
  catch (err) {
    next(err);
  }
}
exports.message_create = (Message, Ticket, User) => async (req, res, next) => {
   try {
    const ticket = await Ticket.findById(req.body.ticketid);
    const new_message = await Message.create({
      text: req.body.text,
      ticket: ticket.id,
      author: req.user.id,
    });
    ticket.messages.push(new_message.id);
    ticket.updated = Date.now();
    ticket.save();
    await new_message.populate({ path: 'author', model: User, select: 'login' });
    res.send(new_message);
  } catch (err) {
    next(err);
  }
}
exports.message_update = Message => async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message.author !== req.user.id) {
      return next(new AppError(404, "fail", "permission error"),
        req, res, next,);
    }
    message.text = req.body.text;
    message.edited = Date.now();
    await message.save();
    res.status(200).json({
      status: "success", message
    });
  } catch (err) {
    next(err);
  }
}
exports.message_delete = (Message, User) => async (req, res, next) => {
  await Message.findByIdAndRemove(req.params.id);
  res.status(200).json('Успех!,message_deleteD');
}

