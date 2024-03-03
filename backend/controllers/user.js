const ticket_controller = require('./ticket');
const message_controller = require('./message');
const base = require('./base');

const userSchema = require('../models/users');
const ticketSchema = require('../models/tickets');
const messageSchema = require('../models/messages');
const officeSchema = require('../models/offices');
const db = require('../models/conn');
const Ticket = db.model("ticket", ticketSchema);
const Message = db.model("message", messageSchema);
const User = db.model("User", userSchema);
const Office = db.model("office", officeSchema);

/* exports.go_home = base.getStart(Office); */

exports.ticket_list = ticket_controller.ticket_list(Ticket, Message);
exports.message_read = ticket_controller.message_read(Ticket, Message);
exports.ticket_detail = ticket_controller.ticket_details(Ticket);
exports.ticket_create = ticket_controller.ticket_create(Ticket, Message, User, Office);
exports.ticket_update = ticket_controller.ticket_update(Ticket);
exports.ticket_delete = ticket_controller.ticket_delete(Ticket);

exports.message_list = message_controller.message_list(Ticket, Message, User);
exports.message_create = message_controller.message_create(Message, Ticket, User);
exports.message_update = message_controller.message_update(Message);
exports.message_delete = message_controller.message_delete(Message, User);


