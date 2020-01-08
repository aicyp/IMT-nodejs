const contactFile = process.env.npm_package_config_contacts;
const fs = require('fs');
const commander = require('commander');

commander
  .command('list').description('output a list of contact').action(() => {
    getListOfContact((data) => data.forEach(contact => {
      console.log(contact.lastName.toUpperCase() + " " + contact.firstName)
    }));
  })
  .command('add <firstName> <lastName>').description('adds a new contact to the list of contact').action(() => {
    
  })
  .command('remove <id>').description('removes a contact of the list').action(() => {

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