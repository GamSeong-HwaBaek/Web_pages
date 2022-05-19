import { db } from '../db/database.js';

const SELECT_JOIN =
  'SELECT g.GalleryId, g.GalleryName, g.DiaryID, g.GalleryDate, g.Img, g.Img_Num, g.OwnerID FROM gallery as g JOIN users as us ON g.OwnerID=us.userid';
const ORDER_DESC =
  'ORDER BY g.GalleryDate DESC';


export async function getbyOwner(ownerid) {
  return db
    .execute(`${SELECT_JOIN} WHERE g.OwnerID=? ${ORDER_DESC}`, [ownerid]) //
    .then((result) => result[0]);
}

export async function getbyId(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE g.GalleryId=?`, [id]) //
    .then((result) => result[0][0]);
}

export async function create(GalleryName, DiaryID, GalleryDate, Img, ImgNum, OwnerID) {
  return db
    .execute(
      'INSERT INTO gallery (GalleryName, DiaryID, GalleryDate, Img, ImgNum, OwnerID) VALUES (?,?,?,?,?,?)',
      [GalleryName, DiaryID, GalleryDate, Img, ImgNum, OwnerID]
    )
    .then((result) => getbyId(result[0].insertid));
}

export async function update(id, title, diaries) { //제목과 일기목록(삭제) 수정가능
  return db.execute('UPDATE gallery SET GalleryName=?, DiaryID=? WHERE OwnerId=?', [title, diaries])
    .then(() => getbyId(id));
}

export async function remove(id) { //전시 삭제 가능
  return db.execute('DELETE FROM gallery WHERE id=?', [id]);
}
