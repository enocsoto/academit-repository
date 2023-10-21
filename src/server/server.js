import express from 'express';
import { router } from '../routes/index.js';
import { sequelize } from '../config/dbconfig.js';

export const app = express();

//middleware
app.use(express.json());


//db
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
//routers
app.use('/api', router)


