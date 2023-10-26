import { Student } from "../model/index.js";

class StudentService {
  async getAllStudents(req) {
    const { limit, pages } = req.query;
    try {
      const student = await Student.findAll();
      if (student.length === 0) return error;
      return student;
    } catch (error) {
      throw new Error(`Students were not found in the database.`);
    }
  }

  async getStudent(req) {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) throw new Error(`Student whit id: ${id} not found`);
    return student;
  }

  async createStudent(req) {
    const { body } = req;
    const courseLowerCase = body.course.toLowerCase();
    const validCourses = ["javascript", "typescript", "node.js"];
    try {
      if (!validCourses.includes(courseLowerCase))
        throw new Error(`'course' must be one of: ${validCourses.join(", ")}`);
      body.course = courseLowerCase;
      const existEmail = await Student.findOne({
        where: { email: body.email, documentId: body.documentId },
      });

      if (existEmail) throw new Error(`email or Id already exists`);
      const newStudent = await Student.create(body);
      if (!newStudent) return error;
      return newStudent;
    } catch (error) {
      throw new Error(error);
    }
  }

  async putStudent(req) {
    const { id } = req.params;
    const { body } = req;
    try {
      const student = await Student.findByPk(id);
      if (!student) return error(`Student not found`);

      const existEmail = await Student.findOne({ where: { email: body.email } });
      if (existEmail) throw new Error(`Email allready Exist`);

      const newStudent = student.set(body);
      if (!newStudent) return error;
      await student.save();
      return newStudent;
    } catch (error) {
      throw new Error(`Error to updated Student ${error.message}`);
    }
  }

  async deleteStudent(req) {
    const { id } = req.params;
    try {
      const result = await Student.update(id);
      return result;
    } catch (error) {
      throw new Error("Error al eliminar el usuario en el servicio");
    }
  }
}

export default new StudentService();
