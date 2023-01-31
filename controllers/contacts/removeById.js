const {Contact} = require('../../models/contact');

const {createError} = require('../../helpers');


const removeById = async (req, res) => {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
  
      if(!result) {
        throw createError(404, "Not found");
      };
      res.json({
        message: "Contact deleted"
      })
  };

  module.exports = removeById;