const express = require("express");


const{validation} = require('../../middlewares/validationMiddleware')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.status(200).json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  contact.length > 0
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", validation, async (req, res, next) => {
  const body = req.body;

  if (!body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
  if (!body.email) {
    res.status(400).json({ message: "missing required email field" });
  }
  if (!body.phone) {
    res.status(400).json({ message: "missing required phone field" });
  }

  await addContact(body);
  res.status(201).end();
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await removeContact(contactId);
  await removeContact(contactId);

  contactToRemove === contactId
    ? res.status(200).json({ message: `contact  deleted` })
    : res.status(404).json({ message: "Contact not found" });
});

router.put("/:contactId", validation, async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (!body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
  if (!body.email) {
    res.status(400).json({ message: "missing required email field" });
  }
  if (!body.phone) {
    res.status(400).json({ message: "missing required phone field" });
  }
  const updatedContacts = await updateContact(contactId, body);


  updatedContacts !== -1
    ? res.status(200).json(updatedContacts)
    : res.status(404).json({ message: "Not found" });
});

module.exports = router;
