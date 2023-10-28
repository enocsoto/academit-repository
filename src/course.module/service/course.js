import { Course, Student} from "../../infrastructure/model/index.js";

class CourseService {
  async getAllCourses(req) {
    const { limit, pages } = req.query;
    try {
      const courses = await Course.findAll({ where: { status: true }, include: { model: Student} });
      if (courses.length === 0) return error;
      return courses;
    } catch (error) {
      throw new Error(`Courses were not found in the database. ${error}`);
    }
  }

  async getCourse(req) {
    const { id } = req.params;
    try {
      const course = await Course.findOne({ where: { id, status: true } });
      if (!course) throw new Error(`Course whit id: ${id} not found`);
      return course;
    } catch (error) {
      throw new Error(`The course could not be retrieved. ${error}`);
    }
  }

  async createCourse(req) {
    const { title } = req.body;

    try {
      const validCourses = await Course.findOne({ Where: { title } });

      if (validCourses) throw new Error(`The course already exists in the database.`);

      const newCourse = await Course.create({ title });

      return newCourse;
    } catch (error) {
      throw new Error(`The course could not be created. ${error}`);
    }
  }

  async putCourse(req) {
    const { id } = req.params;
    try {
      const course = await Course.findOne({ where: { id, status: true } });

      if (!course) throw new Error("Course Not Found");
      const courseUpdated = course.set(req.body);
      return await course.save(courseUpdated);
    } catch (error) {
      throw new Error(`Internal Server Error, ${error}`);
    }
  }

  async endCourse(req) {
    const { id } = req.params;
    try {
      const couseStatusTrue = await Course.findOne({where: {id, status:true}});
      
      if (!couseStatusTrue) 
        throw new Error(`The course with the provided ID: ${id} could not be found.`);
      
      const result = await Course.update({ status: false }, { where: { id } });
    
      return result;
    } catch (error) {
      throw new Error(` ${error}`);
    }
  }
}

export default new CourseService();
