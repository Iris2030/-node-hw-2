const Contact = require("../models/contact");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (contact) => {
  try {
    return Contact.create(contact);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactToDelete = await Contact.findByIdAndDelete(contactId);
    return contactToDelete
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, contact) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, contact, {new: true});
    return updatedContact
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,

};
