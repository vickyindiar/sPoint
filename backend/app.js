import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter  from './routes/index'
import usersRouter from './routes/users'
import listEndpoints  from 'express-list-endpoints'

import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/conn';

import authRouter from './routes/auth.js';
import teacherRouter from './routes/teacher';
import classRouter from './routes/class';
import studentRouter from './routes/student';
import vCategoryRouter from './routes/vCategory';
import vHistoryRouter from './routes/vHistory';
import vTypeRouter from './routes/vType';
import roleRouter from './routes/role';
import {router as uploadRouter} from './routes/uploader';

var app = express();
dotenv.config(); 
connectDB();
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors());
app.use(bodyParser.json());
if(process.env.NODE_ENV === 'development') { app.use(morgan('dev')) }
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/teacher', teacherRouter);
app.use('/api/v1/class', classRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/violation-category', vCategoryRouter);
app.use('/api/v1/violation-history', vHistoryRouter);
app.use('/api/v1/violation-type', vTypeRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/upload', uploadRouter);
  console.log(listEndpoints(app));

export default app;
