const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');


const signup = async (req, res, next) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict('Email in use');
    }

    const avatarURL = gravatar.url(email);
    const verificationToken = v4();
    const newUser = new User({ email, subscription, avatarURL, verificationToken });

    newUser.setPassword(password);
    await newUser.save();

    const mail = {
        to: email,
        subject: 'Confirm your email',
        html: `<a target="_blank" href="http:/localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`
    }
    await sendEmail(mail);
    
    
    res.status(201).json({
        status: "created",
        code: "201",
        data: {
            user: {
                email,
                subscription,
                avatarURL,
                verificationToken
            }
        }
    })
}

module.exports = signup;