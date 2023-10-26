import { DataTypes } from "sequelize";
import {Student} from '../../student.module/model/index.js'
import { sequelize } from "../../config/index.js" ;
import { v4 as uuidv4 } from "uuid";
const Course = sequelize.define(
  "course", //nombre de la tabla
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    createdAt: true,
    updatedAt: true,
  }
);
await Course.sync()
Course.beforeCreate((course, options) => {
  course.title = course.title.toLowerCase();
});

Student.belongsToMany(Course, { through: 'StudentCourses' });
export default Course;