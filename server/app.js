import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import Helpers from './v1/helpers/helpers';
import userRoutes from './v1/routes/userRoutes';

config();

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(json());
app.use(
  urlencoded({
    extended: false,
  }),
);
app.get('/', (req, res) => {
  Helpers.sendSuccess(res, 200, 'Welcome to BroadCaster');
});

app.use('/api/v1/auth', userRoutes);
app.use('/*', (_req, res) => {
  Helpers.sendError(res, 404, 'Not Found');
});

app.use((error, _req, res, _next) => {
  if (error.status === 400) {
    Helpers.sendError(
      res,
      error.status,
      'Syntax error, Please double check your input',
    );
  } else {
    process.stdout.write(error);
    Helpers.sendError(res, error.status || 500, 'OOPS! SERVER DOWN!');
  }
});

app.listen(port, () => {
  process.stdout.write(`Connected on ${port}`);
});

export default app;
