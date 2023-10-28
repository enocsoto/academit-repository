import { sequelize } from "../../infrastructure/config/index.js";
import { Student, Course } from "../../infrastructure/model/index.js";
import { StudentCourses } from "../../infrastructure/model/manyToMany/index.js";

class StudentService {
  async getAllStudents(req) {
    //const { limit, pages } = req.query;
    try {
      const students = await Student.findAll({
        where: { status: true },
        include: {
          model: Course,
        },
      });

      if (students.length === 0) return [];

      return students;
    } catch (error) {
      throw new Error(`Students were not found in the database. ${error.message}`);
    }
  }

  async getStudent(req) {
    const { id } = req.params;
    try {
      const student = await Student.findOne({ 
        where: { id, status: true },
        include: {
          model: Course
        } });

      if (!student) throw new Error(`Student whit id: ${id} not found`);

      return student;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  async createStudent(req) {
    const { body } = req;
    try {
      const existEmail = await Student.findOne({
        where: { email: body.email, documentId: body.documentId },
      });

      if (existEmail) throw new Error(`email or Id already exists`);

      const result = await sequelize.transaction(async (t) => {
        const courseTitle = body.course;

        delete body.course;

        const newStudent = await Student.create(body, { transaction: t });

        if (!newStudent) throw new Error(`Error creating student`);

        const newCourse = await Course.create({ title: courseTitle }, { transaction: t });

        if (!newCourse) throw new Error("Error creating the associated course");

        await StudentCourses.create({
          studentId: newStudent.id,
          courseId: newCourse.id,
        }, { transaction: t });
        return newStudent;
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async putStudent(req) {
    const { id } = req.params;
    const { body } = req;
    try {
      const searchStudent = await Student.findOne({ 
        where: { id, status: true },
        include: {model: Course} });

      if (!searchStudent) 
        throw new Error(`Student whit id ${id} not found`);
        //TODO: PENDIENTE POR CORREGIR
      if (body.course) {
          updatedStudentWithCourse.courses.title = body.course; // Actualiza el título del curso
        }else {
          const newCourse = await Course.create({ title: body.course});
          await updatedStudentWithCourse.update(newCourse)
        }
        const result = await updatedStudentWithCourse.save(body);
      return result;

    } catch (error) {
      throw new Error(`Error to updated Student, ${error.message}`);
    }
  }

  async deleteStudent(req) {
    const { id } = req.params;
    try {
      const result = await Student.update({ status: false }, { where: { id } });

      if (!result) throw new Error(`Student not found`);

      return result;
    } catch (error) {
      throw new Error("Error al eliminar el usuario en el servicio");
    }
  }
}

export default new StudentService();
