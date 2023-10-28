import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/index.js";
import { v4 as uuidv4 } from "uuid";

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
      //allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      get() {
        return undefined;
      },
    },
  },
  {
    sequelize,
    modelName: "courses",
    createdAt: true,
    updatedAt: true,
  }
);
Course.beforeCreate((course, options) => {
  course.title = course.title.toLowerCase();
});
export default Course;
