import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/index.js";
import { Course, Student } from "./index.js";
import { v4 as uuidv4 } from "uuid";

class StudentCourses extends Model {}

StudentCourses.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);
Student.belongsToMany(Course, { foreignKey: 'studentId', through: StudentCourses });
Course.belongsToMany(Student, { foreignKey: 'courseId', through: StudentCourses });

//Sync Database
await Student.sync();
await Course.sync();
await StudentCourses.sync();

export default StudentCourses;
