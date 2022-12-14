const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { User } = require('../../models');


const signup = async (req, res, next) => {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict('Email in use');
    }

    const avatarURL = gravatar.url(email);
    const newUser = new User({
        email, name, avatarURL});

    newUser.setPassword(password);
    await newUser.save();
    
    res.status(201).json({
        status: "created",
        code: "201",
        data: {
            user: {
                email,
                name,
                avatarURL
            }
        }
    })
}

module.exports = signup;