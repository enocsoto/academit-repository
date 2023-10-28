import { Router } from "express";
import { StudentController } from "../student.module/controller/index.js";

const router = Router();

router.get("/:id", StudentController.getStudentById);
router.get("/", StudentController.getAllStudents);
router.post("/", StudentController.createStudent);
router.put("/:id", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);

export default router;
