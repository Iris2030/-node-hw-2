const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../services/contactsService");

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts(req.query, req.user._id);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const body = req.body;
    const { _id } = req.user;

    if (!body.name) {
      res.status(400).json({ message: "missing required name field" });
    }
    if (!body.email) {
      res.status(400).json({ message: "missing required email field" });
    }
    if (!body.phone) {
      res.status(400).json({ message: "missing required phone field" });
    }

    const contact = await addContact(body, _id);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToRemove = await removeContact(contactId);
    await removeContact(contactId);
    if (!contactToRemove) {
      res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: `Contact deleted` });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
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

    if (!updatedContacts) {
      res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContacts);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined) {
      res.status(400).json({ message: "missing field favorite" });
    }
    const updatedContacts = await updateContact(contactId, req.body);
    if (!updatedContacts) {
      res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
  updateStatusContact,
};
