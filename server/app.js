import express from 'express';
import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';
import Helpers from './v1/helpers/helpers';
import userRoutes from './v1/routes/userRoutes';
import recordRoutes from './v1/routes/recordRoutes';

config();

const app = express();
const port = process.env.PORT;

app.use('/uploads', express.static('uploads'));
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
app.use('/api/v1/records', recordRoutes);
app.use('/*', (_req, res) => {
  Helpers.sendError(res, 404, 'Not Found');
});

app.use((error, _req, res, _next) => {
  Helpers.sendError(res, error.status || 500, `SERVER DOWN!: ${error.message}`);
});

app.listen(port, () => {
  process.stdout.write(`Connected on ${port}`);
});

export default app;
