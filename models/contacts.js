const fs = require('fs/promises');
const path = require('path');
const ObjectId = require("bson-objectid");

const contactsPath = path.join(__dirname, '/contacts.json');

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
} 

const listContacts = async () => {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
const result = await contacts.find(contact => contact.id === contactId);
if(!result) {
  return null;
}
return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(contact => contact.id === contactId);

  if(indexContact === -1) {
      return null;
  };

  const [result] = contacts.splice(indexContact, 1);
  updateContacts(contacts);
  return result;
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
    const newContact = {
      id: ObjectId(),
        name,
             email, 
              phone,
              
    };
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(contact => contact.id === contactId);

        if(indexContact === -1) {
            return null;
        };

    contacts[indexContact] = {contactId, ...body};
    await updateContacts(contacts);
    return contacts[indexContact];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
