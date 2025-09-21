import sqlite from "sqlite3";

const db = new sqlite.Database('./data/database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email STRING,
    password STRING
)`).run()

export const getAllUsers = () => db.prepare(`SELECT * FROM users`).all();
export const getUserById = (id) => db.prepare(`SELECT * FROM users WHERE id=?`).get(id);
export const createUSer = (email, password) => {
    return db.prepare(`INSERT INTO users (email, password) VALUES (?, ?)`).run(email, password)
} 
export const updateUser = (id, email, password) =>{
    db.prepare(`UPDATE users SET email=?, password=?, WHERE id=?`).run(id, email, password);
}
export const deleteUser = (id) => db.prepare(`DELETE FROM users WHERE id=?`).run(id);

const users = [
    {email: 'adam@gmail.com', password: 'adamisgood'},
    {email: 'bob@gmail.com', password: 'bobthebig'},
    {email: 'cecil@gmail.com', password: 'cecilsnake'},
]

const insertUsers = db.prepare(`INSERT INTO users (email, password) VALUES (?, ?)`);

const existingUsers = db.prepare(`SELECT COUNT(*) AS count FROM users`).get().count;
if (existingUsers === 0){
    users.forEach(user => insertUsers.run(user.email, user.password));
}

for (const user of users) createUSer(user.email, user.password);