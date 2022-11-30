const getCurrent = async (req, res, next) => {
    const { email, name} = req.user;
    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
                email,
                name
            }
        }
    })
}

module.exports = getCurrent;