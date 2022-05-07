let diary = [
  {
    id: '1',
    date: '20220302',
    emotion: '{emotion:  `Happy`}',
    weather: '맑음',
    title: '개강',
    contents: '이제 드디어 대면강의가 시작한다!',
    writer: '최은서'
  },
  {
    id: '2',
    date: '20220315',
    emotion: '{emotion:  `Excited`}',
    weather: '흐림',
    title: '키친 마이야르 탐방기',
    contents: '고대하던 키친 마이야르를 방문하게 되었다.',
    writer: '이나혁'
  },
  {
    id: '3',
    date: '20220401',
    emotion: '{emotion:  `Sad`}',
    weather: '맑음',
    title: '만우절과 신입생',
    contents: '만우절이라고 교복을 입고 돌아다니는 신입생 친구들을 보니 잠깐 눈물이 났다.',
    writer: '이하은'
  },
];

export async function getAll() {
  return diary;
}

export async function getbyWriter(writer) {
  return diary.filter((data) => data.writer === writer);
}

export async function getbyDate(date) {
  return diary.find((data) => data.date === date);
}
/*
export async function getbyEmotion(emotion) {
  return diary.find((data) => data.emotion === emotion);
}
*/
export async function create(date, emotion, weather, title, contents, writer) {
  const data = {
    id: Date.now().toString(),
    date,
    emotion,
    weather,
    title,
    contents,
    writer
  };
  diary = [data, ...diary]; //이거 날짜별로 정렬하는게 좋을거 같아요!
  return data;
}

export async function update(date, emotion, weather, title, contents) {
  const data = diary.find((data) => data.date === date);
  if (data) {
    data.emotion = emotion;
    data.weather = weather;
    data.title = title;
    data.contents = contents;
  }
  return data;
}

export async function remove(id) {
  diary = diary.filter((data) => data.id !== id);
}
