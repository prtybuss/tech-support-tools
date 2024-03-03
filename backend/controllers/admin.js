const officeSchema = require('../models/offices');
const tagSchema = require('../models/tags');
const userSchema = require('../models/users');
const db = require('../models/conn');
const Office = db.model("office", officeSchema);
const Tag = db.model("tag", tagSchema);
const User = db.model("user", userSchema);
const office_controller = require('./office');
const tag_controller = require('./tag');
const fs_controller = require('./fs');


/* 	~ ~ ~  Office  ~ ~ ~	 */
exports.office_list = office_controller.office_list(Office);
exports.office_details = office_controller.office_details(Office, User);
exports.office_update = office_controller.office_update(Office, User);
exports.link_post = office_controller.link_post(Office);
exports.link_delete = office_controller.link_delete(Office);
exports.comment_post = office_controller.comment_post(Office, User);
exports.comment_delete = office_controller.comment_delete(Office, User);
/*  ~ ~ ~  Tag  ~ ~ ~	 */
exports.tag_list = tag_controller.tag_list(Tag);
exports.tag_details = tag_controller.tag_details(Office, Tag);
exports.tag_post = tag_controller.tag_post(Office, Tag);
exports.tag_delete = tag_controller.tag_delete(Office, Tag);
/* ~ ~ ~    fs   ~ ~ ~ */
exports.img_get = fs_controller.img_get(Office)
exports.img_post = fs_controller.img_post(Office)
exports.audio_get = fs_controller.audio_get(Office, User)
exports.files_list = fs_controller.files_list(Office, User)