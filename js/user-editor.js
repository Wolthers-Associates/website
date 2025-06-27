const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
}

function loadUsers() {
  ensureDataFile();
  const raw = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(raw);
}

function saveUsers(users) {
  ensureDataFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function addUser(user) {
  const users = loadUsers();
  const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  users.push({ id, ...user });
  saveUsers(users);
  return id;
}

function updateUser(id, updates) {
  const users = loadUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  return true;
}

function deleteUser(id) {
  const users = loadUsers();
  const filtered = users.filter(u => u.id !== id);
  if (filtered.length === users.length) return false;
  saveUsers(filtered);
  return true;
}

module.exports = {
  loadUsers,
  addUser,
  updateUser,
  deleteUser
};
