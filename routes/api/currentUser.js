const express = require("express");
const router = express.Router();
const {auth} = require('../../middlewares/auth')
const getCurrent = require('../../controllers/currentUserController')


router.get("/current",auth,getCurrent);


module.exports = router;
