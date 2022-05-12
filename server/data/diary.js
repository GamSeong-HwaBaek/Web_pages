import { db } from '../db/database.js';
// 데이터에 이미지 추가 필요

const SELECT_JOIN =
  'SELECT di.id, di.date, di.emotion, di.weather, di.title, di.contents, us.name FROM diary as di JOIN users as us ON di.userid=us.userid';
const ORDER_DESC = 
  'ORDER BY di.date DESC';

// export async function getAll() {
//   return db
//     .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
//     .then((result) => result[0]);
// }

export async function getAllByUserId(userid) {
  return db
    .execute(`${SELECT_JOIN} WHERE userid=? ${ORDER_DESC}`, [userid]) //
    .then((result) => result[0]);
}

export async function getbyId(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE di.id=?`, [id]) //
    .then((result) => result[0][0]);
}

export async function getbyDate(date) {
  return db
    .execute(`${SELECT_JOIN} WHERE di.date=?`, [date]) //
    .then((result) => result[0][0]);
}

/*
export async function getbyEmotion(emotion) {
  return diary.find((data) => data.emotion === emotion);
}
*/

export async function create(date, emotion, weather, title, contents, userid) {
  return db
    .execute(
      'INSERT INTO diary (date, emotion, weather, title, contents, userid) VALUES (?,?,?,?,?,?)',
      [date, emotion, weather, title, contents, userid]
    )
    .then((result) =>getbyId(result[0].insertid));


export async function update(date, emotion, weather, title, contents) {
  return db.execute('UPDATE diary SET emotion=?, weather=?, title=?, contents=? WHERE date=?', [emotion, weather, title, contents, date])
    .then(() => getbyDate(date));
}

export async function remove(id) {
  return db.execute('DELETE FROM diary WHERE id=?', [id]);
}