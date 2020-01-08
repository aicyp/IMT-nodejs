const func = require('./app_func.js');
const commander = require('commander');
const shortid = require('shortid');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Server configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Définition des routes
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/health', (req, res) => res.status(204).send());
app.get('/contacts', (req, res) => {
  func.getListOfContact((data) => res.send(data));
});
app.post('/contacts', (req, res) => {
  let id = shortid.generate();
  func.getListOfContact((data) => {
    let item = { "id":id, "lastName":req.body.lastName, "firstName":req.body.firstName};
    data.push(item);
    func.overwriteListOfContact(data);
  });
  let redirectURL = '/contacts/' + id;
  res.status(201).location(redirectURL).send(redirectURL);
});
app.get('/contacts/:id', (req, res) => func.getContactById(req.params.id, (data) => {
  if (data == null) {
    res.status(404).send();
  } else {
    res.send(data);
  }
}));
app.delete('/contacts/:id', (req, res) => func.removeContactById(req.params.id, (data) => {
  if (data === 1) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
}));

// Définition des commandes
commander
  .command('serve')
  .description('starts a server on wich we can do some actions')
  .action(() => app.listen(port, () => console.log(`port: ${port}`)));

commander
  .command('list')
  .description('output a list of contact')
  .action(() => {
    func.getListOfContact((data) => data.forEach(contact => {
      console.log(contact.lastName.toUpperCase() + " " + contact.firstName)
    }));
  });

commander
  .command('add <firstName> <lastName>')
  .description('adds a new contact to the list of contact')
  .action((firstName, lastName) => {
    func.getListOfContact((data) => {
      let item = { "id":shortid.generate(), "lastName":lastName, "firstName":firstName};
      data.push(item);
      func.overwriteListOfContact(data);
    });
  });

commander
  .command('remove <id>')
  .description('removes a contact of the list')
  .action((id) => {
    func.getListOfContact((data) => {
      func.overwriteListOfContact(data.filter(contact => contact.id !== id));
    });
  });

commander.parse(process.argv);
if (process.argv.length < 3) commander.help();