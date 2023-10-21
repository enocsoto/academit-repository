import { request, response } from "express";
import { StudentService } from "../service/index.js";
const students = new StudentService
export const getAllStudents = (req = request, res = response) => {
    const getStudentes = students.getAllStudents()

    res.status(200).json({
        msg: getStudentes
    })
}
export const createStudent = (req = request, res = response) => {
    const createStudent = students.createStudent()

    res.status(200).json({
        msg: createStudent
    })
}

export const updateStudent = (req = request, res = response) => {
    const {body} = req;
    const updateStudent = students.putStudent()

    res.status(200).json({
        msg: updateStudent,
        body
    })
}

export const deleteStudent = (req = request, res = response) => {
    const {id} = req.params;
    const deleteStudent = students.deleteStudent()

    res.status(200).json({
        msg: deleteStudent
    })
}