import { request, response } from "express";
import { CourseService } from "../service/index.js";
import HttpResponse from "../../utils/errorHandler.js";

class CourseController {
  async getOneCourse(req = request, res = response) {
    try {
      const getOneCourseById = await CourseService.getCourse(req);
      return HttpResponse.Ok(res, getOneCourseById);
    } catch (error) {
      return HttpResponse.NotFound(res, error.message);
    }
  }

  async getAllCourses(req = request, res = response) {
    try {
      const getCourses = await CourseService.getAllCourses(req);
      return HttpResponse.Ok(res, getCourses);
    } catch (error) {
      return HttpResponse.NotFound(res, error.message);
    }
  }

  async createCourse(req = request, res = response) {
    try {
      const courseCreated = await CourseService.createCourse(req);
      return HttpResponse.Created(res, courseCreated);
    } catch (error) {
      return HttpResponse.InternalError(res, error.message);
    }
  }

  async updateCourse(req = request, res = response) {
    try {
      const courseUpdated = await CourseService.putCourse(req);
      return HttpResponse.Ok(res, courseUpdated);
    } catch (error) {
      return HttpResponse.InternalError(res, error.message);
    }
  }

  async finishCourse(req = request, res = response) {
    try {
      await CourseService.endCourse(req);
      return HttpResponse.Ok(res, `Course Deleted`);
    } catch (error) {
      HttpResponse.NotFound(res, error.message);
    }
  }
}

export default new CourseController();
