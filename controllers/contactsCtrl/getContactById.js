const { Contact } = require('../../models/contacts');

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId)
  
  if (!contact) {
    return res.status(404).json({
            status: "error",
            code: 404,
            message: "Not found",
            }) 
  } else {
    return res.json({
            status: "success",
            code: 200,
            result: contact,
            })
  }
  
}

module.exports = getContactById;