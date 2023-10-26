import { Student, Course, Auth } from'./index.js';

// Relaciones
Student.belongsToMany(Course, { through: 'StudentCourses' });
Course.belongsToMany(Student, { through: 'StudentCourses' });

Student.hasOne(Auth);
Auth.belongsTo(Student);
