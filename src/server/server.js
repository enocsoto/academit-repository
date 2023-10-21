import express from 'express';
import { router } from '../routes/index.js';

export const app = express();

//middleware
app.use(express.json());

//routers
app.use('/api', router)


