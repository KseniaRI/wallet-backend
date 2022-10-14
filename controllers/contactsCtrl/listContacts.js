const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite} = req.query;
  const skip = (page - 1) * limit;
  let contacts = [];
  favorite ? contacts = await Contact.find({ owner: _id, favorite }, "", { skip, limit: Number(limit) }).populate("owner", "_id email")
           : contacts = await Contact.find({ owner: _id }, "", { skip, limit: Number(limit) }).populate("owner", "_id email");
  return res.json({
    status: "success",
    code: 200,
    result: contacts,
  })
}

module.exports = listContacts;