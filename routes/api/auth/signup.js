const express = require("express");
const router = express.Router();
const{userValidation} = require('../../../middlewares/validationMiddleware')
const {registUser} = require('../../../controllers/authController')


router.post("/signup",userValidation, registUser);


module.exports = router;
