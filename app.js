const contactFile = process.env.npm_package_config_contacts;
const fs = require('fs');
const commander = require('commander');
const shortid = require('shortid');

commander
  .command('list')
  .description('output a list of contact')
  .action(() => {
    getListOfContact((data) => data.forEach(contact => {
      console.log(contact.lastName.toUpperCase() + " " + contact.firstName)
    }));
  });

commander
  .command('add <firstName> <lastName>')
  .description('adds a new contact to the list of contact')
  .action((firstName, lastName) => {
    getListOfContact((data) => {
      let item = { "id":shortid.generate(), "lastName":lastName, "firstName":firstName};
      data.push(item);
      overwriteListOfContact(data);
    });
  });

commander
  .command('remove <id>')
  .description('removes a contact of the list')
  .action((id) => {
    getListOfContact((data) => {
      overwriteListOfContact(data.filter(contact => contact.id !== id));
    });
  });

commander.parse(process.argv);

if (process.argv.length < 3) commander.help();

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