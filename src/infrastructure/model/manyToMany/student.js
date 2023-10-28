import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/index.js";
import { v4 as uuidv4 } from "uuid";

class Student extends Model {}
Student.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 99,
      },
    },
    phone: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        len: [1, 10],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid Email",
        },
      },
    },
    documentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 10],
      },
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
    modelName: "students",
    createdAt: true,
    updatedAt: true,
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields: ["documentId"],
      },
    ],
  }
);

Student.beforeCreate((student) => {
  student.email = student.email.toLowerCase();
  student.name = student.name.toLowerCase();
  student.lastName = student.lastName.toLowerCase();
});

Student.beforeUpdate((student) => {
  if (student.changed("email")) student.email = student.email.toLowerCase();

  if (student.changed("name")) student.name = student.name.toLowerCase();

  if (student.changed("lastName")) student.lastName = student.lastName.toLowerCase();
});

export default Student;
