import * as exhibitionRepository from '../data/exhibition.js';

export async function getExhibitions(req, res) {
  const OwnerID = req.query.OwnerID;
  const data = await exhibitionRepository.getbyOwner(OwnerID);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Exhibition id(${OwnerID}) not found` });
  }
}


export async function getbyId(req, res, next) {
  const GalleryID = req.params.GalleryID
  const data = await exhibitionRepository.getbyId(GalleryID);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Exhibition id(${GalleryID}) not found` });
  }
}


export async function create(req, res, next) {
  const { GalleryID, GalleryName, DiaryID, GalleryDate, Img_Num, OwnerID, Createby } = req.body;
  const data = await exhibitionRepository.create(GalleryID, GalleryName, DiaryID, GalleryDate, Img_Num, OwnerID, Createby);
  res.status(201).json(data);
}

export async function update(req, res, next) {
  const GalleryID = req.params.GalleryID;
  const GalleryName = req.body.GalleryName;
  const DiaryID = req.body.DiaryID;
  const data = await exhibitionRepository.getbyId(GalleryID);
  if (!data) {
    return res.status(404).json({ message: `Exhibitions not found: ${GalleryID}` });
  }
  const updated = await exhibitionRepository.update(GalleryID, GalleryName, DiaryID);
  res.status(200).json(updated);
}

export async function remove(req, res, next) {
  const GalleryID = req.params.GalleryID;
  const data = await exhibitionRepository.getbyId(GalleryID);
  if (!data) {
    return res.status(404).json({ message: `Exhibition id(${GalleryID}) not found` });
  }
  if (data.userid !== req.userid) {
    return res.sendStatus(403);
  }
  await exhibitionRepository.remove(GalleryID);
  res.sendStatus(204);
}
