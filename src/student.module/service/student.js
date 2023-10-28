import { sequelize } from "../../infrastructure/config/index.js";
import { Student, Course } from "../../infrastructure/model/index.js";

class StudentService {
  async getAllStudents(req) {
    const { limit, pages } = req.query;
    try {
      const students = await Student.findAll({ 
        //TODO: modelo de relacion incluida curso = [];
        where: {status: true}, 
        include: {
          model: Course
        }
      });

      if (students.length === 0) return [];
      console.log(students.course)
      return students;
    } catch (error) {
      throw new Error(`Students were not found in the database. ${error.message}`);
    }
  }

  async getStudent(req) {
    const { id } = req.params;
    try {
      const student = await Student.findOne({ where: { id, status: true } });

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
      const student = await Student.findOne({ where: { id, status: true } });

      if (!student) throw new Error(`Student whit id ${id} not found`);

      const newStudent = student.update(body);
      const associatedCourse = await Course.findOne({ where: { id: student.course } });

      if (associatedCourse) {
        associatedCourse.title = body.course; // Actualiza el título del curso
        await associatedCourse.save();
      }

      return newStudent;
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
