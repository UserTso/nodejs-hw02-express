const { User } = require("../../models/user");

const updateSubsccription = async (req, res) => {
const {_id, email} = req.user;
const user = await User.findByIdAndUpdate(_id, req.body, {new: true});

res.json({
    email: email,
    subscription: user.subscription,
})
}

module.exports = updateSubsccription;