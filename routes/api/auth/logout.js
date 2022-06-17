const express = require("express");
const router = express.Router();
const {logoutUser} = require('../../../controllers/authController');
const {auth} = require('../../../middlewares/auth')


router.post("/logout",auth, logoutUser);


module.exports = router;
