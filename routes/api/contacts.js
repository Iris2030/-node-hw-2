const express = require("express");
const{createValidation, patchValidation} = require('../../middlewares/validationMiddleware')

const {getAll, getById,create, deleteById, updateById,updateStatusContact} = require('../../controllers/contactsController')

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId",getById);

router.post("/",createValidation, create);

router.delete("/:contactId",deleteById);

router.put("/:contactId",createValidation,updateById);

router.patch("/:contactId/favorite",patchValidation,updateStatusContact)

module.exports = router;
