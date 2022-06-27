const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const getCurrent = require("../../controllers/currentUserController");
const upload = require("../../middlewares/multer");
const updateAvatar = require("../../controllers/imageController");

router.use(auth);

router.get("/current", getCurrent);
router.patch("/avatars", upload.single("avatar"), updateAvatar);

module.exports = router;
