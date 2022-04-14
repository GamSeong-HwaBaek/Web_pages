import express from 'express';
import 'express-async-errors';
import * as diaryController from '../controller/diary.js';

const router = express.Router();

//GET /diary
//GET /diary?username=:username
router.get('/', diaryController.getAll);

//GET /diary/date
router.get('/:date', diaryController.getbyDate);

//POST /diary
router.post('/', diaryController.create);

//PUT /diary/:date
router.put('/:date', diaryController.update);

//DELETE / diary/:id
router.delete('/:id', diaryController.remove);

export default router;