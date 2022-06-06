import { db } from '../db/database.js';
// 데이터에 이미지 추가 필요

const SELECT_JOIN =
  'SELECT di.id, di.date, di.emotion, di.weather, di.title, di.contents, di.beforeImg, di.afterImg, us.name FROM diary as di JOIN users as us ON di.userid=us.userid';
const ORDER_DESC =
  'ORDER BY di.date DESC';

// export async function getAll() {
//   return db
//     .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
//     .then((result) => result[0]);
// }

export async function getAllByUserId(userid) {
  return db
    .execute(`${SELECT_JOIN} WHERE us.userid=? ${ORDER_DESC}`, [userid]) //
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

/*SELECT di.id, di.date, json_extract(emotion, '$."emotions"'), di.weather, di.title, di.contents, us.name 
FROM diary as di 
JOIN users as us ON di.userid=us.userid
*/
/*function findIndexs(array, value) {
  fromIndex = array.indexOf(value)
  while (fromIndex != -1) {
    document.writeln(fromIndex);
    fromIndex = arr.indexOf(1, fromIndex + 1);
  }
};*/
/*
export async function getbyEmotion(emotion) {
  return db
    .execute(`SELECT json_extract(emotion, '$."emotions"') FROM diary as di JOIN users as us ON di.userid=us.userid')`)
    .then(arrayresult = arrayresult[0][0])
    .then(arrayIndex = findIndexs(arrayresult, emotion)).then(console.log(arrayIndex));
  /*
  .execute(`SELECT di.id, di.date, json_extract(emotion, '$."emotions"'), di.weather, di.title, di.contents, us.name 
FROM diary as di 
JOIN users as us ON di.userid=us.userid
where di.id=?`, [arrayIndex])
  .then((result) => result[0][0]);
  
}
*/



export async function create(date, emotion, weather, title, contents, userid, beforeImg, afterImg) {
  return db
    .execute(
      'INSERT INTO diary (date, emotion, weather, title, contents, userid, beforeImg, afterImg) VALUES (?,?,?,?,?,?,?,?)',
      [date, emotion, weather, title, contents, userid, beforeImg, afterImg]
    )
    .then((result) => getbyId(result[0].insertId));
}


export async function update(date, emotion, weather, title, contents) {
  return db.execute('UPDATE diary SET emotion=?, weather=?, title=?, contents=? WHERE date=?', [emotion, weather, title, contents, date])
    .then(() => getbyDate(date));
}

export async function remove(id) {
  return db.execute('DELETE FROM diary WHERE id=?', [id]);
}