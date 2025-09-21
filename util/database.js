import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT
  )
`).run();

// CRUD functions
export const getAllUsers = () =>
  db.prepare(`SELECT * FROM users`).all();

export const getUserById = (id) =>
  db.prepare(`SELECT * FROM users WHERE id=?`).get(id);

export const createUser = (email, password) =>
  db.prepare(`INSERT INTO users (email, password) VALUES (?, ?)`).run(email, password);

export const updateUser = (id, email, password) =>
  db.prepare(`UPDATE users SET email=?, password=? WHERE id=?`).run(email, password, id);

export const deleteUser = (id) =>
  db.prepare(`DELETE FROM users WHERE id=?`).run(id);

const users = [
  { email: 'adam@gmail.com', password: 'adamisgood' },
  { email: 'bob@gmail.com', password: 'bobthebig' },
  { email: 'cecil@gmail.com', password: 'cecilsnake' },
];

const existingUsers = db.prepare(`SELECT COUNT(*) AS count FROM users`).get().count;

if (existingUsers === 0) {
  const insert = db.prepare(`INSERT INTO users (email, password) VALUES (?, ?)`);
  users.forEach(user => insert.run(user.email, user.password));
}