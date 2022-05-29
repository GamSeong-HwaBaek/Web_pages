import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as exhibitionController from '../controller/exhibition.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateExhibition = [
    body('title')
        .trim()
        .isLength({ min: 3 })
        .withMessage('text should be at least 3 characters'),
    validate,
];
//GET /exhibition
//GET /exhibition?username=:username 사용자에 대한 모든 다이어리 가져오기.
router.get('/', exhibitionController.getExhibitions);

//GET /exhibition/id 전시 선택
router.get('/:id', exhibitionController.getbyId);

//POST /exhibition
router.post('/', validateExhibition, exhibitionController.create);

//PUT /exhibition/:id
//router.put('/:id', exhibitionController.update);  

//DELETE /exhibition/:id
//router.delete('/:id', exhibitionController.remove);

export default router;