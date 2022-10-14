const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    
    try {
        const { _id } = req.user;
        const resultUpload = path.join(__dirname, '../../', "public", "avatars", `${_id}_${originalname}`);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatar", `${_id}_${originalname}`);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = updateAvatar;