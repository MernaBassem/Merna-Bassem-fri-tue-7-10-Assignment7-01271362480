import { Router } from "express";
import * as RentalController from "./rental.controller.js";
const router = Router();

router.post("/addRental", RentalController.addRental);
// router.get("/specificCarById/:id", CarController.specificCarById);
// router.get("/getAllCar", CarController.getAllCar);
router.put("/UpdateRental/:id", RentalController.UpdateRental);
router.delete("/deleteRental/:id", RentalController.deleteRental);

export default router;
