// models/user.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/index.js";
import Student from "./manyToMany/student.js";
import { v4 as uuidv4 } from "uuid";

import * as bcrypt from "bcrypt";
class Auth extends Model {}
Auth.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    email: {
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
    modelName: "auths",
    timestamps: false,
  }
);

Auth.belongsTo(Student, {
  foreignKey: "studentId", // Define el nombre de la clave foránea en la tabla Auth
  targetKey: "id", // Define el nombre de la clave primaria en la tabla Student
});

Auth.beforeCreate((user) => {
  if (user.password) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
});

Auth.beforeUpdate((user) => {
  if (user.password) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
});

// sincroniza los cambios que tenga el modelo con la DB
//await Auth.sync()
export default Auth;
