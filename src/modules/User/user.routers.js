//user router

import { Router } from "express";
import * as UserController from "./user.controller.js";
const router = Router();

router.post("/register", UserController.register);


export default router;
