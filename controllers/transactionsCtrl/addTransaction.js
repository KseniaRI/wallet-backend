const { Transaction, User } = require('../../models');

const addTransaction = async (req, res, next) => {
  const { _id, balance } = req.user;
  const { type, amount } = req.body;
  let balanceCalc = balance;
  console.log(balance);
  type ? balanceCalc += amount : balanceCalc -= amount;


  const newTransaction = await Transaction.create({ ...req.body, owner: _id });
  await User.findByIdAndUpdate(_id, { balance: balanceCalc });
  return  res.status(201).json({
            status: "success",
            code: 201,
            result: newTransaction,
          })
}

module.exports = addTransaction;