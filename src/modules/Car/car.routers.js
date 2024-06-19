import { Router } from "express";
import * as CarController from "./car.controller.js";
const router = Router();

router.post("/addCar", CarController.addCar);
router.get("/specificCarById/:id", CarController.specificCarById);
router.get("/getAllCar", CarController.getAllCar);
router.put("/updateCar/:id", CarController.updateCar);
router.delete("/deleteCar/:id", CarController.deleteCar);
router.get(
  "/availableCarSpecificModel",
  CarController.availableCarSpecificModel
);

export default router;
