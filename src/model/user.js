// models/user.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/index.js';
import Student from './student.js';

export class User extends Model { }
User.init(
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
    modelName: 'user',
    // createdAt: true,
    // updatedAt: true,
  }
);

User.belongsTo(Student, {
  foreignKey: 'studentId', // Define el nombre de la clave foránea en la tabla User
  targetKey: 'id', // Define el nombre de la clave primaria en la tabla Student
});
 // sincroniza los cambios que tenga el modelo con la DB
await User.sync()