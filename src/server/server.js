import express from "express";
import { Auth, courseRoutes, studentRoutes } from "../routes/index.js";
import { sequelize } from "../infrastructure/config/index.js";
import "../infrastructure/model/manyToMany/studentCourse.js";
import passport from "passport";

const app = express();

//middleware
app.use(express.json());

//routers
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api", Auth);

//db
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default app;
