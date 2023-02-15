const { User } = require("../../models/user");

const { createError, sendEmail, createVerifyEmail } = require("../../helpers");

const resendEmail = async(req, res) => {
    const {email} = req.body;
    const user = User.findOne({email});
    if (!user){
        throw createError(404)
    }
    if (user.verify){
        throw createError(400, "Email already verify")
    }

    const verifyEmail = createVerifyEmail(email, user.verificationToken);

    await sendEmail(verifyEmail)

    res.json({
        message: "Verify email resend success"
    })

}

module.exports = resendEmail;