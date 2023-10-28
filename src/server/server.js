import express from "express";
import { courseRoutes, studentRoutes } from "../routes/index.js";
import { sequelize } from "../infrastructure/config/index.js";
import relationModels from "../infrastructure/model/relationsTables.js";
import morgan from "morgan";
import expressListEndpoints from "express-list-endpoints";

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//Relaciones

//routers
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
//db
try {
  await sequelize.authenticate();
  await sequelize.sync().then(() => relationModels());
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const endpoints = expressListEndpoints(app);
console.log(endpoints);
export default app;
