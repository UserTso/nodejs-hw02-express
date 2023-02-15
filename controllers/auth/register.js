const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const objectID = require("bson-objectid");

const { User } = require("../../models/user");

const { createError, sendEmail, createVerifyEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = objectID();
  const newUser = await User.create({ name, email, password: hashPassword, avatarURL, verificationToken });

  const verifyEmail = createVerifyEmail(email, verificationToken);

await sendEmail(verifyEmail)

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = register;
