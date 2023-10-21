import { Sequelize } from "sequelize";
import "dotenv/config";
const envs = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
};

export const sequelize = new Sequelize(envs.DB_NAME, envs.DB_USER, envs.DB_PASS, {
  host: envs.DB_HOST,
  dialect: 'mysql',
  port: envs.DB_PORT,
});