const {
  listContacs,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts.js");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "userId")
  .option("-n, --name <type>", "userName")
  .option("-e, --email <type>", "userEmail")
  .option("-p, --phone <type>", "userPhone");

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacs();
      break;
    case "get":
      getContactById(id);
      break;
    case "remove":
      removeContact(id);
      break;
    case "add":
      addContact(name, email, phone);
      break;
    default:
      console.log("Action not register!");
  }
}

invokeAction(argv);
