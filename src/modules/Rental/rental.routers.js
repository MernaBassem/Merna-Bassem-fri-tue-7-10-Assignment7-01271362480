import { Router } from "express";
import * as RentalController from "./rental.controller.js";
const router = Router();

router.post("/addRental", RentalController.addRental);
router.get("/specificRentalById/:id", RentalController.specificRentalById);

router.put("/UpdateRental/:id", RentalController.UpdateRental);
router.delete("/deleteRental/:id", RentalController.deleteRental);
router.get("/getAllRental", RentalController.getAllRental);
export default router;
