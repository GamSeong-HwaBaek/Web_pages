import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import diaryRouter from './router/diary.js';
import authRouter from './router/auth.js';
import exhibitionRouter from './router/exhibition.js';
import { config } from './config.js';
import { db } from './db/database.js';
import path from 'path';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static('public'));

const __dirname = path.resolve();


app.use('/auth', authRouter);
//app.use('/diary', function(req, res, next){
//res.sendFile(path.join(__dirname,'..','client/public/views/tempdiary.html'));
//}, diaryRouter);
app.use('/diary', diaryRouter);
app.use('/exhibition', exhibitionRouter);

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "client/public/views/logo_page.html"));
});

app.use('/front', (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "client/public/views/fronpage.html"));
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});


db.getConnection().then((connection) => console.log(connection));
app.listen(config.host.port);