const express = require("express");
const{createValidation, patchValidation} = require('../../middlewares/validationMiddleware')
const{auth,authorization} = require('../../middlewares/auth')
const {getAll, getById,create, deleteById, updateById,updateStatusContact} = require('../../controllers/contactsController')

const router = express.Router();

router.use(auth)

router.get("/", getAll);

router.get("/:contactId",getById);

router.post("/", createValidation, create);

router.delete("/:contactId",authorization('business'),deleteById);

router.put("/:contactId",createValidation,updateById);

router.patch("/:contactId/favorite",patchValidation,updateStatusContact)

module.exports = router;
