import { Car } from "../../../DB/connection.js";
import { ObjectId } from "mongodb";

// 1- add Car
export const addCar = async (req, res, next) => {
  const { name, model, rental_status } = req.body;
  const existingCar = await Car.findOne({ name, model });
  if (existingCar) {
    return res
      .status(400)
      .json({ message: "Car with this name and model already exists." });
  }

  try {
    const car = await Car.insertOne({
      name,
      model,
      rental_status,
    });
    return res.status(201).json({ message: "Successfully ADD Car ", car });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//----------------------------------------------------------------
//2- Get a specific car.

export const specificCarById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const car = await Car.findOne({ _id: new ObjectId(id) });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json({ car });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
