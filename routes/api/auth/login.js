const express = require("express");
const router = express.Router();
const{loginValidation} = require('../../../middlewares/validationMiddleware')
const {loginUser} = require('../../../controllers/authController')


router.post("/login",loginValidation,loginUser);


module.exports = router;
