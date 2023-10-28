import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/index.js";
import { v4 as uuidv4 } from "uuid";
import { Student } from "./index.js";

class Course extends Model {}
Course.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'courses',
    createdAt: true,
    updatedAt: true,
  }
);
Course.beforeCreate((course, options) => {
  course.title = course.title.toLowerCase();
});
//await Course.sync()

//Course.belongsToMany(Student, { through: "StudentCourse" });
export default Course;
