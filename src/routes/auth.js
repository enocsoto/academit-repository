import { Router } from "express";
import { AuthGoogle } from "../auth.module/controller/index.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", AuthGoogle.login);
router.post("/register", AuthGoogle.register);


export default router;
