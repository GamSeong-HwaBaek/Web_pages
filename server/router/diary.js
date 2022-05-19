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

router.get('/', diaryController.getDiaries);

// router.get('/:id', isAuth, diaryController.getbyId);

//GET /diary/date
router.get('/:date', diaryController.getData);


/*GET /diary/emodion 감정 검색
router.get('/:emotion', diaryController.getbyEmotion);
*/

//POST /diary
router.post('/', validateDiary, diaryController.create);

//PUT /diary/:date
router.put('/:date', validateDiary, diaryController.update);


router.delete('/:id',  diaryController.remove);

export default router;