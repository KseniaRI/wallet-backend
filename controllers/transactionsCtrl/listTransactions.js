const { Transaction } = require('../../models');

const listTransactions = async (req, res) => {
  const { _id } = req.user;
  // const { page = 1, limit = 10} = req.query;
  // const skip = (page - 1) * limit;
  // , "", {skip, limit: Number(limit)}

  const transactions = await Transaction.find({ owner: _id }).populate("owner", "_id email");
  return res.json({
    status: "success",
    code: 200,
    result: transactions.reverse(),
  })
}

module.exports = listTransactions;