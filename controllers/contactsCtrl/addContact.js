const { Contact } = require('../../models');

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  return  res.status(201).json({
            status: "success",
            code: 201,
            result: newContact,
          })
}

module.exports = addContact;