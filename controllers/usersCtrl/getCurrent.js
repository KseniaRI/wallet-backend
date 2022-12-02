const getCurrent = async (req, res, next) => {
    const { email, name, balance} = req.user;
    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
                email,
                name,
                balance
            }
        }
    })
}

module.exports = getCurrent;