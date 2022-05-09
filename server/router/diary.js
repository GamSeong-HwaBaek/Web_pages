import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as diaryController from '../controller/diary.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateDiary = [
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('text should be at least 3 characters'),
  validate,
];

//GET /diary
<<<<<<< HEAD
//GET /diary?username=:username
router.get('/', isAuth, diaryController.getDiaries);

router.get('/:id', isAuth, diaryController.getbyId);

//GET /diary/date
router.get('/:date', isAuth, diaryController.getbyDate);
=======
//GET /diary?username=:username 사용자에 대한 모든 다이어리 가져오기.
router.get('/', diaryController.getAll);

//GET /diary/date 날짜 검색
router.get('/:date', diaryController.getbyDate);
>>>>>>> 0520f836864877dd774c54ba2e91de2e23cbcb6b

/*GET /diary/emodion 감정 검색
router.get('/:emotion', diaryController.getbyEmotion);
*/

//POST /diary
router.post('/', isAuth, validateDiary, diaryController.create);

//PUT /diary/:date
router.put('/:date', isAuth, validateDiary, diaryController.update);

<<<<<<< HEAD
//DELETE / diary/:id
router.delete('/:id', isAuth, diaryController.remove);
=======
//DELETE /diary/:id
router.delete('/:id', diaryController.remove);
>>>>>>> 0520f836864877dd774c54ba2e91de2e23cbcb6b

export default router;