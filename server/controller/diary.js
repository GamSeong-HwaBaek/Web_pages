import * as diaryRepository from '../data/diary.js';

export async function getDiaries(req, res) {
  const userid = req.query.userid;
  const data = await diaryRepository.getAllByUserId(userid);
  if (data) {
    res.status(200).json(data);
    console.log(data);
  } else {
    res.status(404).json({ message: `Diary id(${id}) not found` });
  }
  //   const userid = req.query.userid;
  //   const data = await (userid
  //     ? diaryRepository.getAllByUserId(userid)
  //     : diaryRepository.getAll());
  //   res.status(200).json(data);
  // 
}

export async function getbyId(req, res, next) {
  const id = req.params.id;
  const data = await diaryRepository.getbyId(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Diary id(${id}) not found` });
    //이거 id가 아니라 Diary written on date(${date}) not found 이런식으로 해야할듯!
    // URL 내에서 사용x!
  }
}

export async function getData(req, res, next) {
  const date = req.params.date;
  const data = await diaryRepository.getbyDate(date);
  if (!data) {
    return res.status(404).json({ message: `Diary not found: ${date}` });
  } else {
    res.status(200).json(data);
  }
}

/*
export async function getbyEmotion(req, res, next) {
  const emotion = req.params.emotion;
  const data = await diaryRepository.getbyEmotion(emotion);
  var step;
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Diary written as emotion(${emotion}) not found` });
  }
}
*/



export async function create(req, res, next) {
  const { date, emotion, weather, title, contents, userid } = req.body;
  const data = await diaryRepository.create(date, emotion, weather, title, contents, userid);
  res.status(201).json(data);
}

export async function update(req, res, next) {
  const date = req.params.date;
  const emotion = req.body.emotion;
  const weather = req.body.weather;
  const title = req.body.title;
  const contents = req.body.contents;
  const data = await diaryRepository.getbyDate(date);
  if (!data) {
    return res.status(404).json({ message: `Diary not found: ${date}` });
  }
  const updated = await diaryRepository.update(date, emotion, weather, title, contents);
  res.status(200).json(updated);
}

export async function remove(req, res, next) {
  const id = req.params.id;
  const data = await diaryRepository.getbyId(id);
  if (!data) {
    return res.status(404).json({ message: `Diary not found: ${id}` });
  }
  if (data.userid !== req.userid) {
    return res.sendStatus(403);
  }
  await diaryRepository.remove(id);
  res.sendStatus(204);
}
