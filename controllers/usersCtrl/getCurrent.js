const getCurrent = async (req, res, next) => {
    const { email, name, balance, avatarURL} = req.user;
    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
                email,
                name,
                balance,
                avatarURL
            }
        }
    })
}

module.exports = getCurrent;