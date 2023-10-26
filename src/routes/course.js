import { Router } from "express";
import {CourseController}  from "../course.module/controller/index.js";

const router = Router();

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getOneCourse);
router.post('/', CourseController.createCourse);
router.put('/', CourseController.updateCourse);
router.delete('/:id', CourseController.finishCourse);

export default router;