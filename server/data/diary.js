import * as userRepository from './auth.js';

let diary = [
  {
    id: '1',
    date: '20220302',
    emotion: '{emotion:  `Happy`}',
    weather: '맑음',
    title: '개강',
    contents: '이제 드디어 대면강의가 시작한다!',
    userId: '1'
  },
  {
    id: '2',
    date: '20220315',
    emotion: '{emotion:  `Excited`}',
    weather: '흐림',
    title: '키친 마이야르 탐방기',
    contents: '고대하던 키친 마이야르를 방문하게 되었다.',
    userId: '1'
  },
  {
    id: '3',
    date: '20220401',
    emotion: '{emotion:  `Sad`}',
    weather: '맑음',
    title: '만우절과 신입생',
    contents: '만우절이라고 교복을 입고 돌아다니는 신입생 친구들을 보니 잠깐 눈물이 났다.',
    userId: '1'
  },
];

export async function getAll() {
  return Promise.all(
    diary.map(async (data) => {
      const { username, naxme, url } = await userRepository.findById(
        data.userId
      );
      return { ...data, username, name, url };
    })
  );
}

export async function getbyWriter(username) {
  return getAll().then((diary) => 
    diary.filter((data) => data.username === username)
  );
}

export async function getbyId(id) {
  const found = diary.find((data) => data.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function getbyDate(date) {
  return diary.find((data) => data.date === date);
}


export async function create(date, emotion, weather, title, contents, userId) {

/*
export async function getbyEmotion(emotion) {
  return diary.find((data) => data.emotion === emotion);
}
*/
  const data = {
    id: new Date().toString(),
    date,
    emotion,
    weather, 
    title, 
    contents, 
    userId,
  };
  diary = [data, ...diary];
  return getbyId(data.id);
}

export async function update(id, date, emotion, weather, title, contents) {
  const data = diary.find((data) => data.id === id);
  if (data) {
    data.date = date;
    data.emotion = emotion;
    data.weather = weather;
    data.title = title;
    data.contents = contents;
  }
  return getbyId(data.id);
}

export async function remove(id) {
  diary = diary.filter((data) => data.id !== id);
}
