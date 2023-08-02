import express from 'express';
import { json } from 'body-parser';
require('express-async-errors');
import cookieSession from 'cookie-session';
import { signupRouter } from './routes/signup';
import { mailVerifyRouter } from './routes/mailVerify';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler, NotFoundError, currentUser } from '@fbticketss/common';
import morgan from 'morgan';

const app = express();
app.use(morgan('tiny'));
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);
app.use(signupRouter);
app.use(mailVerifyRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async (req, res) => {
  //
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
