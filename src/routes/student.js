import { Router } from "express";
import { getAllStudents, createStudent,deleteStudent, updateStudent } from "../controller/index.js";
const router = Router();

router.get('/', getAllStudents);
router.post('/', createStudent);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export {router};