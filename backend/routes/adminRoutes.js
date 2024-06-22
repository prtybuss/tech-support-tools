const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploads/')
		/* cb(null, `./public/uploads/${file.originalname}/`) */
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, file.fieldname + '' + file.originalname + '-' + uniqueSuffix + '.jpg')
	}
})
const upload = multer({ storage: storage });

/* 	~ ~ ~   Offices  ~ ~ ~	 */
router
	.route('/offices')
	.get(adminController.office_list);
router
	.route('/office/:officeId')
	.get(adminController.office_details)
	.post(adminController.office_update);
router
	.route('/office/:officeId/link')
	.post(adminController.link_post);
router
	.route('/office/:officeId/link/:linkId')
	.delete(adminController.link_delete)
router
	.route('/office/:officeId/comment')
	.post(adminController.comment_post);
router
	.route('/office/:officeId/comment/:commentId')
	.delete(adminController.comment_delete);

/*   ~ ~ ~   Tags    ~ ~ ~	 */
router
	.route('/tags')
	.get(adminController.tag_list);
router
	.route('/tag/:tagId')
	.get(adminController.tag_details);
router
	.route('/office/:officeId/tag')
	.post(adminController.tag_post);
router
	.route('/office/:officeId/tag/:tagId')
	.delete(adminController.tag_delete);

/*   ~ ~ ~   fs  ~ ~ ~	 */
router
	.route('/office/:officeId/img/:imgId')
	.get(adminController.img_get);
router
	.route('/office/:officeId/img')
	.post(upload.array('image', 8), adminController.img_post);
router
	.route('/office/:officeId/:userId/listen/:dir?/:file')
	.get(adminController.audio_get);
router
	.route('/office/:officeId/files/:userId/:subfolder?')
	.get(adminController.files_list);

/*   ~ ~ ~   Users  ~ ~ ~	 */
router
	.route('/:userId')
	.post(adminController.user_update);

module.exports = router;