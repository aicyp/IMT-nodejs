const contactFile = process.env.npm_package_config_contacts;
const fs = require('fs');
const commander = require('commander');

commander.command('list').description('output a list of contact').action(() => {
  let contactList = [];

  fs.readFile(contactFile, 'utf8', (err, data) => {
    if (err) throw err;

    contactList = JSON.parse(data);
    contactList.forEach(contact => {
      console.log(contact.lastName.toUpperCase() + " " + contact.firstName)
    });
  });
});

commander.parse(process.argv);

if (process.argv.length < 3) commander.help();