import "dotenv/config";
import { Sequelize } from "sequelize";
import {envs} from '../utils/envs.js'

const sequelize = new Sequelize(envs.DB_NAME, envs.DB_USER, envs.DB_PASS, {
  host: envs.DB_HOST,
  dialect: 'mysql',
  port: envs.DB_PORT,
});

export default sequelize;