import * as diaryRepository from '../data/diary.js';

export async function getAll(req, res) {
  const writer = req.query.writer;
  const data = await (writer
    ? diaryRepository.getbyWriter(writer)
    : diaryRepository.getAll());
  res.status(200).json(data);
}

export async function getbyDate(req, res, next) {
  const date = req.params.date;
  const data = await diaryRepository.getbyDate(date);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Diary id(${id}) not found` });
  }
}

export async function create(req, res, next) {
  const { date, emotion, weather, title, contents, writer } = req.body;
  const data = await diaryRepository.create(date, emotion, weather, title, contents, writer);
  res.status(201).json(data);
}

export async function update(req, res, next) {
  const date = req.params.date;
  const emotion = req.body.emotion;
  const weather = req.body.weather;
  const title = req.body.title;
  const contents = req.body.contents;
  const data = await diaryRepository.update(date, emotion, weather, title, contents);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Diary id(${id}) not found` });
  }
}

export async function remove(req, res, next) {
  const id = req.params.id;
  await diaryRepository.remove(id);
  res.sendStatus(204);
}
