import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import { AppRouter } from './AppRouter';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['dkjhdsff'] }));
app.use(router);
app.use(AppRouter.getInstance());

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
