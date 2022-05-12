import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import diaryRouter from './router/diary.js';
<<<<<<< HEAD
import authRouter from './router/auth.js';
=======
import exhibitionRouter from './router/exhibition.js';
>>>>>>> 0520f836864877dd774c54ba2e91de2e23cbcb6b

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/diary', diaryRouter);
app.use('/exhibition', exhibitionRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);