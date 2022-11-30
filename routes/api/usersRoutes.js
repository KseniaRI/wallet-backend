const express = require('express');
const { upload, authMiddleware, ctrlWrapper } = require('../../middlewares');
const { usersCtrl: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', authMiddleware, ctrlWrapper(ctrl.getCurrent));
router.patch('/avatars', authMiddleware, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;