const fs = require("fs");
const path = require("path");
// const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

console.log("Path to folder:", contactsPath);

function listContacs() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error("Error on  reading file!");
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  if (!contactId) {
    console.error("Please write a contact Id!");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log("Error on reading file!");
      return;
    }
    const contacts = JSON.parse(data);

    const contact = contacts.find((contact) => {
      if (contact.id === contactId) {
        console.log(`Details for ${contactId}:`);
        console.table(contact);
        return contact;
      }
      //   if (contact.id !== contactId) {
      //     console.log(`Contact with ID "${contactId}" not found!`);
      //   }
    });
  });
}

function removeContact(contactId) {
  if (!contactId) {
    console.error("Please write the contact Id you want to remove!");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log("Error on reading file!");
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.findIndex((contact) => contact.id === contactId);
    if (contact === -1) {
      console.log(`Contact with id: ${contactId} does not exist!`);
      return;
    }
    const [idcontact] = contacts.splice(contact, 1);
    console.log(`Contact with id: ${contactId} was deleted!`);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null), (error) => {
      if (error) {
        console.err("Error on deleting contact!");
        return;
      }
    });
  });
}

function addContact(name, email, phone) {
  if (!name) {
    console.error("You must add a contact!");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log("Error on reading file!");
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: String(Date.now()),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    console.log("Contacts added successfully!");
    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
      if (error) {
        console.err("Error on adding contact!");
        return;
      }
    });
  });
}

module.exports = {
  listContacs,
  getContactById,
  removeContact,
  addContact,
};
