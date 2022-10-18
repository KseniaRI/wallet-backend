const express = require('express');
const { authMiddleware, validation, ctrlWrapper } = require('../../middlewares');
const { authCtrl: ctrl } = require('../../controllers');
const { signupJoiSchema, loginJoiSchema} = require('../../models/userModel');

const router = express.Router();

router.post('/signup', validation(signupJoiSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(loginJoiSchema), ctrlWrapper(ctrl.login));
router.get('/logout', authMiddleware, ctrlWrapper(ctrl.logout));

module.exports = router;