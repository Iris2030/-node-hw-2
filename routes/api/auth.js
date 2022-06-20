const express = require("express");
const router = express.Router();
const{loginValidation,userValidation,subscriptionValidation} = require('../../middlewares/validationMiddleware')
const {login,logout,register,updateSubscription} = require('../../controllers/authController')
const {auth} = require('../../middlewares/auth')


router.post("/signup",userValidation, register);
router.post("/login",loginValidation,login);
router.post("/logout",auth, logout);
router.patch("/",auth,subscriptionValidation, updateSubscription);



module.exports = router;
