const {createError} = require('../helpers');

const validateBody = schema => {
    const func = async(req, res, next) => {
        const {error} = schema.validate(req.body);
  
      if(error) {
        next(createError(400, 'missing required name field'));
      }
      next();
    }
    return func;
};

module.exports = validateBody;