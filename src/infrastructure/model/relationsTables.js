import { Student, Course, Auth } from "./index.js";

// Relaciones muchos a muchos
const relationModels = () => {
  Auth.belongsTo(Student);
  Student.hasOne(Auth);
  Course.belongsToMany(Student, { through: "StudentCourse" });
  Student.belongsToMany(Course, { through: "StudentCourse" });
};

export default relationModels;
