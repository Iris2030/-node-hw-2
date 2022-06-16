const express = require("express");
const router = express.Router();
const{auth} = require('../../../middlewares/auth')
const {updateSubscription} = require('../../../controllers/authController')
const {subscriptionValidation} = require('../../../middlewares/validationMiddleware')


router.patch("/",auth,subscriptionValidation, updateSubscription);


module.exports = router;
