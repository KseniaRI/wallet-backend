const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const resendEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.json({
        status: "error",
        code: 400,
        message: "missing required field email",
        })
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Unauthorized('Email is wrong');
    }

    if (user.verify) {
        res.json({
            status: "error",
            code: 400,
            message: 'Verification has already been passed',
        })
    }

    const mail = {
        to: email,
        subject: 'Confirm your email',
        html: `<a target="_blank" href="http:/localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`
    }
    await sendEmail(mail);

    res.json({
        status: "success",
        code: 200,
        message: 'Verification email sent',
    })
}

module.exports = resendEmail;