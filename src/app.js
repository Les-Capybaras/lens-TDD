import express from 'express';
import bodyParser from 'body-parser';
import loadRoutes from './loaders/routes.js';
import {connect} from './loaders/database.js';
import errorMiddleware from './middlewares/error.js';

connect();

const app = express();

app.use(bodyParser.json());
loadRoutes(app);
app.use(errorMiddleware);

export default app;
