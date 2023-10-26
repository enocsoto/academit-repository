// models/user.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/index.js";
import Student from "./student.js";

const Auth = sequelize.define(
  "auth",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "auth",
    createdAt: false,
    updatedAt: false,
  }
);

Auth.belongsTo(Student, {
  foreignKey: "studentId", // Define el nombre de la clave foránea en la tabla Auth
  targetKey: "id", // Define el nombre de la clave primaria en la tabla Student
});
// sincroniza los cambios que tenga el modelo con la DB
await Auth.sync()
export default Auth;
