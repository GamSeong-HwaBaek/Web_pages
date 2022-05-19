let exhibition = [
  {
    id: "1",
    title: "",
    diaries: [1, 2, 3],
    date: '20220302',
    //mainimage : 
    img_Num: 1,
    owner: '최은서'
  }
];

export async function getAll() {
  return exhibition
}

export async function getbyWriter(writer) {
  return exhibition.filter((data) => data.writer === writer);
}

export async function getbyId(id) {
  return exhibition.find((data) => data.id === id);
}

export async function create(title, diaries, date, owner) {
  const data = {
    id: (exhibition.length + 1).toString(), /* 얘도 회원id+전시번호로 나중에 바꿀것 */
    title,
    diaries,
    date,
    img_Num: exhibition.length,
    owner
  };
  exhibition = [data, ...exhibition]; //전시는 최근에 생성되는게 쌓이는 형태
  return data;
}

export async function update(id, title, diaries) { //제목과 일기목록(삭제) 수정가능
  const data = exhibition.find((data) => data.id === id);
  if (data) {
    data.title = title;
    data.diaries = diaries;
  }
  return data;
}

export async function remove(id) { //전시 삭제 가능
  exhibition = exhibition.filter((data) => data.id !== id);
}
