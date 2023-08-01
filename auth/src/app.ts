import express from 'express';
import { json } from 'body-parser';
require('express-async-errors');
import cookieSession from 'cookie-session';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError, currentUser } from '@fbticketss/common';
import morgan from 'morgan';

const app = express();
app.use(morgan('tiny'));
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(signupRouter);
app.use(currentUser);

app.all('*', async (req, res) => {
  //
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
