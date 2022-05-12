import { db } from '../db/database.js';
import * as userRepository from './auth.js';
// 데이터에 이미지 추가 필요

const SELECT_JOIN =
  'SELECT di.DiaryID, di.DiaryDate, di.Emotion, di.Weather, di.DiaryTitle, di.DiaryContents, us.name FROM diary as di JOIN users as us ON di.userID=us.userId';
const ORDER_DECS = 
  'ORDER BY di.DiaryDate DSEC';
export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DECS}`) //
    .then((result) => result[0]);
}

export async function getbyId(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE di.DiaryID=?`, [id]) //
    .then((result) => result[0][0]);
}

export async function getbyDate(date) {
  return db
    .execute(`${SELECT_JOIN} WHERE di.DiaryDate=?`, [date]) //
    .then((result) => result[0][0]);
}

/*
export async function getbyEmotion(emotion) {
  return diary.find((data) => data.emotion === emotion);
}
*/

export async function create(date, emotion, weather, title, contents, userId) {
  const {DiaryDate, Emotion, Weather, DiaryTitle, DiaryContents, userID} = data;
  return db
    .execute(
      'INSERT INTO diary (DiaryDate, Emotion, Weather, DiaryTitle, DiaryContents, userID) VALUES (?,?,?,?,?,?)',
      [date, emotion, weather, title, contents, userId]
    )
    .then((result) =>getbyId(result[0].insertId));
}

export async function update(date, emotion, weather, title, contents) {
  return db.execute('UPDATE diary SET emotion=?, weather=?, title=?, contents=? WHERE date=?', [emotion, weather, title, contents, date])
  .then(() => getbyDate(date));
}

export async function remove(id) {
  return db.execute('DELETE FROM diary WHERE id=?', [id]);
}
