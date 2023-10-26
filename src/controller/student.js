import { request, response } from "express";
import { StudentService } from "../service/index.js";
import HttpResponse from '../utils/errorHandler.js'

class StudentController {
  async getStudentById(req = request, res = response) {
    try {
      const getOneStudentById = await StudentService.getStudent(req);
      return HttpResponse.Ok(res, getOneStudentById)
    } catch (error) {
      return HttpResponse.NotFound(res, error.message);
    }
  }

  async getAllStudents(req = request, res = response) {
    try {
      const getStudents = await StudentService.getAllStudents(req);
     return HttpResponse.Ok(res, getStudents);
    } catch (error) {
      return HttpResponse.InternalError(res, error.message)
    }
  }

  async createStudent(req = request, res = response) {
    try {
      const studentCreated = await StudentService.createStudent(req);
      return HttpResponse.Created(res, studentCreated);
    } catch (error) {
      return HttpResponse.InternalError(res, error.message)
    }
  }

  async updateStudent(req = request, res = response) {
    try {
      const studentUpdated = await StudentService.putStudent(req);
      return HttpResponse.Ok(res, studentUpdated)
    } catch (error) {
      return HttpResponse.InternalError(res, error.message);
    }
  }

  async deleteStudent(req = request, res = response) {
    try {
      await StudentService.deleteStudent(req);
      return HttpResponse.Ok(res, 'Student Deleted')
    } catch (error) {
      HttpResponse.NotFound(res, error.message)
    }
  }
}

export default new StudentController();
