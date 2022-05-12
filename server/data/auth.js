import {db} from '../db/database.js'

export async function findByUsername(username) {
  return db
    .execute('SELECT * FROM users WHERE username=?', [username])
    .then((result) => result[0][0]);
  //return users.find((user) => user.username === username);
}

export async function findById(userid) {
  return db
  .execute('SELECT * FROM users WHERE userid=?', [userid])
  .then((result) => result[0][0]);
  // return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const {username, password, name, email, url} = user;
  return db
    .execute(
      'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
      [username, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}