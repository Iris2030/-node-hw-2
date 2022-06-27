const uploadImage = require("../services/imageService");
const updateUser = require("../services/userService");

const updateAvatar = async (req, res, next) => {
  try {
    const id = req.user._id;
    const avatarURL = await uploadImage(id, req.file);
    await updateUser(id, { avatarURL });

    if (!req.user) {
      res.status(401).json("Not authorized");
    }
    res.status(200).json({ avatarURL: avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
