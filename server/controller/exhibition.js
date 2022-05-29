import * as exhibitionRepository from '../data/exhibition.js';

export async function getExhibitions(req, res) {
  const userid = req.query.userid;
  const data = await exhibitionRepository.getbyOwner(userid);
  if (data) {
    res.status(200).json(data);
    console.log(data);
  } else {
    res.status(404).json({ message: `Exhibition id(${id}) not found` });
  }
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
  const { GalleryName, DiaryID, GalleryDate, ImgNum, OwnerID, Createby } = req.body;
  const data = await exhibitionRepository.create(GalleryName, DiaryID, GalleryDate, ImgNum, OwnerID, Createby);
  res.status(201).json(data);
}

export async function update(req, res, next) {
  const id = req.params.id;
  const title = req.body.title;
  const diaries = req.body.diaries;
  const data = await diaryRepository.getbyId(id);
  if (!data) {
    return res.status(404).json({ message: `Exhibitions not found: ${id}` });
  }
  const updated = await exhibitionRepository.update(id, title, diaries);
  res.status(200).json(updated);
}

export async function remove(req, res, next) {
  const id = req.params.id;
  const data = await exhibitionRepository.getbyId(id);
  if (!data) {
    return res.status(404).json({ message: `Exhibition id(${id}) not found` });
  }
  if (data.userid !== req.userid) {
    return res.sendStatus(403);
  }
  await exhibitionRepository.remove(id);
  res.sendStatus(204);
}
