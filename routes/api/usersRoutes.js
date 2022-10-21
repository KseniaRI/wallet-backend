const express = require('express');
const { upload, validation, authMiddleware, ctrlWrapper } = require('../../middlewares');
const { updateSubscriptionJoiSchema } = require('../../models/userModel');
const { usersCtrl: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', authMiddleware, ctrlWrapper(ctrl.getCurrent));
router.patch('/', authMiddleware, validation(updateSubscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));
router.patch('/avatars', authMiddleware, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post('/verify', ctrlWrapper(ctrl.resendEmail));

module.exports = router;