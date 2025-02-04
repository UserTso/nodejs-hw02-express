const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env;

const {createError, ctrlWrapper} = require('../helpers');

const {User} = require('../models/user');

const authenticate = async(req, res, next) => {
    const {authorization} = req.headers;
    const [bearer, token] = authorization.split(" ");

    if(bearer !== "Bearer"){
        throw createError(401)
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token){
            throw new Error();
        }
        req.user = user;
        next();

    } catch (error) {
        throw createError(401)
    }

}

module.exports = ctrlWrapper(authenticate);