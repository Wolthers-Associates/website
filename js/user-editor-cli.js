const ue = require('./user-editor');
const [command, ...args] = process.argv.slice(2);

switch (command) {
  case 'list':
    console.log(ue.loadUsers());
    break;
  case 'add':
    const [name, email] = args;
    if (!name || !email) {
      console.error('Usage: add <name> <email>');
      process.exit(1);
    }
    const id = ue.addUser({ name, email });
    console.log(`Added user ${name} with id ${id}`);
    break;
  case 'update':
    const [idStr, key, value] = args;
    if (!idStr || !key || !value) {
      console.error('Usage: update <id> <field> <value>');
      process.exit(1);
    }
    const idNum = parseInt(idStr, 10);
    const success = ue.updateUser(idNum, { [key]: value });
    console.log(success ? 'Updated' : 'User not found');
    break;
  case 'delete':
    const [idDel] = args;
    if (!idDel) {
      console.error('Usage: delete <id>');
      process.exit(1);
    }
    const successDel = ue.deleteUser(parseInt(idDel, 10));
    console.log(successDel ? 'Deleted' : 'User not found');
    break;
  default:
    console.log('Commands: list, add <name> <email>, update <id> <field> <value>, delete <id>');
}
