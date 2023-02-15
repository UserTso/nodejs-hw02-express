
const {BASE_URL} = process.env;

const createVerifyEmail = (email, verificationToken) => {
    const verifyEmail = {
        to: email,
        subject: 'Verify you email',
        html: `<a target="_blank" href="http://${BASE_URL}/api/auth/verify/${verificationToken}">Click verify your email</a>`,
      };

      return verifyEmail;
}

module.exports = createVerifyEmail;