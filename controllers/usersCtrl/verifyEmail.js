const { NotFound } = require('http-errors');
const { User } = require('../../models');

const verifyEmail = async(req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw NotFound;
    }
    if (user.verify) {
        res.json({
        status: "error",
        code: 400,
        message: 'Verification has already been passed',
    })
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
    res.json({
        status: "success",
        code: "200",
        message: "Verification successful",
    })
}

module.exports = verifyEmail;