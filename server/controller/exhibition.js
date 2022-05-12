import * as exhibitionRepository from '../data/exhibition.js';

export async function getAll(req, res) {
  const writer = req.query.writer;
  const data = await (writer
    ? exhibitionRepository.getbyOwner(writer)
    : exhibitionRepository.getAll());
  res.status(200).json(data);
}

export async function getbyId(req, res, next) {
  const id = req.params.id
  const data = await exhibitionRepository.getbyId(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Exhibition id(${id}) not found` });
  }
}

export async function create(req, res, next) {
  const { title, diaries, date, owner } = req.body;
  const data = await exhibitionRepository.create(title, diaries, date, owner);
  res.status(201).json(data);
}

export async function update(req, res, next) {
  const title = req.params.title;
  const diaries = req.params.diaries;
  const data = await exhibitionRepository.update(req.params.id, title, diaries);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Exhibition id(${id}) not found` });
  }
}

export async function remove(req, res, next) {
  const id = req.params.id;
  await exhibitionRepository.remove(id);
  res.sendStatus(204);
}
