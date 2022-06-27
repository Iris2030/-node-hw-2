const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const getCurrent = require("../../controllers/currentUserController");
const upload = require("../../middlewares/multer");
const updateAvatar = require("../../controllers/imageController");
const { confirm, resendEmail } = require("../../controllers/authController");

// router.use(auth);

router.get("/current", auth, getCurrent);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", confirm);
router.post("/verify", resendEmail);

module.exports = router;
