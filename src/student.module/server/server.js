import express from 'express';
//import { router } from '../routes/index.js';
import { router } from '../student.module/routes/index.js';
import { sequelize } from '../config/index.js';
import morgan from 'morgan';
import expressListEndpoints from 'express-list-endpoints';
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'))

//routers
app.use('/api/students', router)
//db
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const endpoints = expressListEndpoints(app);
  console.log(endpoints);
export default app;