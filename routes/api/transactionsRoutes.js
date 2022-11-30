const express = require('express');
const { validation, ctrlWrapper, authMiddleware } = require('../../middlewares');
const { transactionJoiSchema } = require('../../models/transactionModel');
const { transactionsCtrl: ctrl } = require('../../controllers');

const router = express.Router()

router.get('/', authMiddleware, ctrlWrapper(ctrl.listTransactions));
router.get('/categories', authMiddleware, ctrlWrapper(ctrl.getCategories));
router.post('/', authMiddleware, validation(transactionJoiSchema), ctrlWrapper(ctrl.addTransaction));

module.exports = router;
