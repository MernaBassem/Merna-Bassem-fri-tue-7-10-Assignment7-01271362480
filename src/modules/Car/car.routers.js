import { Router } from "express";
import * as CarController from "./car.controller.js";
const router = Router();

router.post("/addCar",CarController.addCar);
router.get("/specificCarById/:id", CarController.specificCarById);

export default router;
