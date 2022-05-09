import * as diaryRepository from '../data/diary.js';

export async function getDiaries(req, res) {
  const username = req.query.username;
  const data = await (username
    ? diaryRepository.getbyWriter(username)
    : diaryRepository.getAll());
  res.status(200).json(data);
}

export async function getbyId(req, res, next) {
  const id = req.params.id;
  const data = await diaryRepository.getbyId(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Diary id(${id}) not found` });
  }
}

export async function getbyDate(req, res, next) {
  const date = req.query.date;
  const data = await diaryRepository.getbyDate(date);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Diary date(${date}) not found` });
  }
}

export async function create(req, res, next) {
  const { date, emotion, weather, title, contents, userId } = req.body;
  const data = await diaryRepository.create(date, emotion, weather, title, contents, userId);
  res.status(201).json(data);
}

export async function update(req, res, next) {
  const id  = req.params.id;
  const date = req.params.date;
  const emotion = req.body.emotion;
  const weather = req.body.weather;
  const title = req.body.title;
  const contents = req.body.contents;
  const data = await diaryRepository.getbyId(id);
  if (!data) {
    return res.status(404).json({ message: `Diary not found: ${id}` });
  }
  if (data.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await diaryRepository.update(id, date, emotion, weather, title, contents);
  res.status(200).json(updated);
}

export async function remove(req, res, next) {
  const id = req.params.id;
  const data = await diaryRepository.getbyId(id);
  if (!data) {
    return res.status(404).json({ message: `Diary not found: ${id}` });
  }
  if (data.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await diaryRepository.remove(id);
  res.sendStatus(204);
}
