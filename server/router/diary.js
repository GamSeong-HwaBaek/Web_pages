import express from 'express';
import 'express-async-errors';
import * as diaryController from '../controller/diary.js';

const router = express.Router();

//GET /diary
//GET /diary?username=:username 사용자에 대한 모든 다이어리 가져오기.
router.get('/', diaryController.getAll);

//GET /diary/date 날짜 검색
router.get('/:date', diaryController.getbyDate);

/*GET /diary/emodion 감정 검색
router.get('/:emotion', diaryController.getbyEmotion);
*/

//POST /diary
router.post('/', diaryController.create);

//PUT /diary/:date
router.put('/:date', diaryController.update);

//DELETE /diary/:id
router.delete('/:id', diaryController.remove);

export default router;