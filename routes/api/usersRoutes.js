const express = require('express');
const { validation, authMiddleware, ctrlWrapper } = require('../../middlewares');
const { updateSubscriptionJoiSchema } = require('../../models/userModel');
const { usersCtrl: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', authMiddleware, ctrlWrapper(ctrl.getCurrent));
router.patch('/', authMiddleware, validation(updateSubscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription))

module.exports = router;