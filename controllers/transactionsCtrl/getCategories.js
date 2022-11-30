const { Transaction } = require('../../models');

const getCategories = async (req, res) => {
    const { _id } = req.user;
    const transactions = await Transaction.find({ owner: _id }).populate("owner", "_id ");
    const categories = transactions.filter(transaction => transaction.type === false).map(transaction => transaction.category);
    return res.json({
        status: "success",
        code: 200,
        result: categories,
    })
}

module.exports = getCategories;