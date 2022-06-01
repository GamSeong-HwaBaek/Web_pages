import { db } from '../db/database.js';

const SELECT_JOIN =
  'SELECT g.GalleryID, g.GalleryName, g.DiaryID, g.GalleryDate, g.Img_Num, g.OwnerID, Createby FROM gallery as g';
const ORDER_DESC =
  'ORDER BY g.GalleryDate DESC';


export async function getbyOwner(OwnerID) {
  return db
    .execute(`${SELECT_JOIN} WHERE g.OwnerID=? ${ORDER_DESC}`, [OwnerID]) //
    .then((result) => result[0]);
}

export async function getbyId(GalleryID) {
  return db
    .execute(`${SELECT_JOIN} WHERE g.GalleryID=?`, [GalleryID]) //
    .then((result) => result[0][0]);
}

export async function create(GalleryID, GalleryName, DiaryID, GalleryDate, Img_Num, OwnerID, Createby) {
  return db
  .execute(
    //INSERT INTO `gamsung3`.`gallery` (`GalleryID`, `GalleryName`, `DiaryID`, `GalleryDate`, `Img_Num`, `OwnerID`, `Createby`) VALUES ('2', 'ㅇㄴㄹ', '{\"diaries\": [1, 2, 3, 4, 5, 6, 7, 9, 10, 11]}', '2022-05-29', '10', '20', '{\"emotions\": \"sad\"}');
    'INSERT INTO gallery (GalleryID, GalleryName, DiaryID, GalleryDate, Img_Num, OwnerID, Createby) VALUES (?,?,?,?,?,?,?)',
    [GalleryID, GalleryName, DiaryID, GalleryDate, Img_Num, OwnerID, Createby]
  )
  .then((result) => getbyId(result[0].insertid));
}

//UPDATE `gamsung3`.`gallery` SET `GalleryName` = '안녕하세요!' WHERE (`GalleryID` = '1');
export async function update(GalleryID, GalleryName, DiaryID) { //제목과 일기목록(삭제) 수정가능 -> Img_Num 업데이트 해야함.
  return db.execute(
    'UPDATE gallery SET GalleryName=?, DiaryID=? WHERE GalleryID=?', [GalleryName, DiaryID, GalleryID])
    .then(() => getbyId(GalleryID));
  }



export async function remove(GalleryID) { //전시 삭제 가능
  return db.execute('DELETE FROM gallery WHERE GalleryId=?', [GalleryID]);
}