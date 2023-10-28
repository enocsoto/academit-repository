import { Course } from "../../student.module/model/index.js";

class CourseService {
  async getAllCourses(req) {
    const { limit, pages } = req.query;
    try {
      const courses = await Course.findAll();
      if (courses.length === 0) return error;
      return courses;
    } catch (error) {
      throw new Error(`Courses were not found in the database.`);
    }
  }

  async getCourse(req) {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) throw new Error(`Course whit id: ${id} not found`);
    return course;
  }

  async createCourse(req) {
    const { body } = req;
    const courseLowerCase = body.title.toLowerCase();
    const validCourses =   await Course.findOne({Where: {title: courseLowerCase }});
      //TODO: verificar si existe el curso
    try {
      if (validCourses)
        throw new Error(`'course' must be one of: ${validCourses.join(", ")}`);
      
      const newCourse = await Course.create(body);
      return newCourse;
    } catch (error) {
      throw new Error(error);
    }
  }

  async putCourse(req) {
    const { id } = req.params;
    const { title } = req.body;
    try {
      if (!["javascript", "typescript", "node.js"].includes(title.toLowerCase()))
        throw new Error(`Invalid course`);

      const course = await Course.findByPk(id);

      if (!course) throw new Error("Course Not Found");

      return await course.save();
    } catch (error) {
      throw new Error(`Internal Server Error, ${error}`);
    }
  }

  async endCourse(req) {
    const { id } = req.params;
    try {
      const result = await Course.update(id);
      return result;
    } catch (error) {
      throw new Error("Error al eliminar el usuario en el servicio");
    }
  }
}

export default new CourseService();
