const contactFile = process.env.npm_package_config_contacts;
const fs = require('fs');

// returns the list of contact that is in the contacts.json
function getListOfContact(callback) {
  fs.readFile(contactFile, 'utf8', (err, data) => {
    if (err) throw err;

    callback(JSON.parse(data));
  });
}

// overwrites the list of contact with a new contact
function overwriteListOfContact(data) {
  let dataToWrite = JSON.stringify(data, null, '\t');

  fs.writeFile(contactFile, dataToWrite, (err) => {
    if (err) throw err;

    console.log('Contact file has been updated');
  })
}

// returns a contact depending on the id
function getContactById(id, callback) {
  getListOfContact((data) => callback(data.find(contact => contact.id === id)));
}

// removes a contact depending on the id
function removeContactById(id, callback) {
  getListOfContact((data) => {
    let newContactList = data.filter(contact => contact.id !== id);
    if (newContactList.length < data.length) {
      overwriteListOfContact(data.filter(contact => contact.id !== id));
      callback(1);
    } else {
      callback(2);
    }
  });
}

module.exports = {
  getListOfContact, overwriteListOfContact, getContactById, removeContactById
}