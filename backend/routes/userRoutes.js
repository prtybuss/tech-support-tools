const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user')
const auth_controller = require('../controllers/auth');
const adminRoutes = require('./adminRoutes');

/* router.get('/home', user_controller.go_home);  */

router.post('/signin', auth_controller.signin);
router.post('/signup', auth_controller.signup);
router.use(auth_controller.protect);

router.get('/ticket/:id/messages', user_controller.message_list);
router.post('/ticket/:id/messages', user_controller.message_read);
router.post('/ticket/message', user_controller.message_create);
router.post('/ticket/:id/message/:id', user_controller.message_update);
router.delete('/ticket/:id/message/:id', user_controller.message_delete);

router.get('/tickets', user_controller.ticket_list);
router.get('/ticket/:id', user_controller.ticket_detail);
router.post('/ticket', user_controller.ticket_create);
router.post('/ticket/:id', user_controller.ticket_update)
router.delete('/ticket/:id', user_controller.ticket_delete);

router.use(auth_controller.restrictTo('admin'));
router.use('/api', adminRoutes);

module.exports = router;