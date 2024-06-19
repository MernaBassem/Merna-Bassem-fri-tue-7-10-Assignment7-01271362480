//user router

import { Router } from "express";
import * as UserController from "./user.controller.js";
import authenticate from "../../Midleware/authentication.midleware.js";
const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", authenticate , UserController.logout);
router.get("/getAllUser", UserController.getAllUser);
router.get("/specificUserById/:id", UserController.specificUserById);
router.put("/updateAccount",authenticate,UserController.updateAccount);
router.delete("/deleteAccount", authenticate, UserController.deleteAccount);

export default router;
