import express from 'express';
import 'express-async-errors';
import * as exhibitionController from '../controller/exhibition.js';

const router = express.Router();

//GET /exhibition
//GET /exhibition?username=:username 사용자에 대한 모든 다이어리 가져오기.
router.get('/', exhibitionController.getAll);

//GET /exhibition/id 전시 선택
router.get('/:id', exhibitionController.getbyId);

//POST /exhibition
router.post('/', exhibitionController.create);

//PUT /exhibition/:id
router.put('/:id', exhibitionController.update);

//DELETE /exhibition/:id
router.delete('/:id', exhibitionController.remove);

export default router;