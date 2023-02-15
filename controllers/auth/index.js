const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubsccription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const verify = require('./verify');
const resendEmail = require('./resendEmail');

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateSubsccription,
    updateAvatar,
    verify,
    resendEmail,
}