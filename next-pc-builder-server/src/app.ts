import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundHandler from './app/middleware/notFoundHandler';
import cookieParser from 'cookie-parser';
/* cors */
app.use(cors());
app.use(cookieParser());

/* parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* application route */
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

/* handle not found */
app.use(notFoundHandler);

export default app;
