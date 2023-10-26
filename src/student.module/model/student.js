import { DataTypes } from "sequelize";
import { sequelize } from "../../config/index.js";
import { v4 as uuidv4 } from "uuid";

const Student = sequelize.define(
  "students", //nombre de la tabla
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
        len: [1, 30]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max:99
      }
    },
    course: {
      type: DataTypes.ENUM("javascript", "typescript", "node.js"),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        len:[1, 10]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid Email'
        }
      }
    },
    documentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 10]
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    coursesTaken: {
      type: DataTypes.JSON,
      defaultValue: {
        javascript: 0,
        typescript: 0,
        'node.js': 0
      },
    }
  },
  {
    sequelize,
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
Student.addScope('active', {
  where: {
    status: true
  }
})

Student.beforeCreate((student, options) => {
  student.email = student.email.toLowerCase();
  student.name = student.name.toLowerCase();
  student.lastName = student.lastName.toLowerCase();
});

Student.beforeUpdate((student, options) => {
  if (student.changed("email")) {
    student.email = student.email.toLowerCase();
  }
  if (student.changed("name")) {
    student.name = student.name.toLowerCase();
  }
  if (student.changed("lastName")) {
    student.lastName = student.lastName.toLowerCase();
  }
});
await Student.sync()
export default Student;
