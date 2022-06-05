const uniqid = require("uniqid");
const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.join(__dirname, "./contacts.json")
const Contact = require('./contact')

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log(error);
  }
}



const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;

  } catch (error) {
    console.log(error);
  }
}



const addContact = async ({name, email, phone}) => {
  const newContact = {
    id: uniqid(),
    name,
    email,
    phone,
  };
  try {
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = await contacts.filter((contact) => {
      return contact.id !== contactId;
    });
    const contactIndex = await contacts.findIndex((contact) => {
      return contact.id === contactId;
    });
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    return contacts[contactIndex].id
  } catch (error) {
    console.log(error);
  }
}


const updateContact = async (contactId, {name, email,phone}) => {
  try {
    const contacts = await listContacts();
    const contactIndex = await contacts.findIndex((contact) => {
      return contact.id === contactId;
    });
    if(contactIndex !== -1){
      contacts[contactIndex].name = name;
      contacts[contactIndex].email = email;
      contacts[contactIndex].phone = phone;
    }

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contactIndex
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}