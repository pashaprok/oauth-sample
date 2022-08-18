import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import { catchErrors } from './middlewares/catchErrors.middleware';
import mainRoute from './routes/main.route';
import authRoute from './routes/auth.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '../static')));

// routes here
app.use('/', mainRoute);
app.use('/auth', authRoute);

app.use(catchErrors);

export default app;
