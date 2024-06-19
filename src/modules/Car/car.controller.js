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
//----------------------------------------------------------------
// 3- get all car

export const getAllCar = async (req, res, next) => {
  try {
    const car = await Car.find().toArray();
    res.status(200).json({ Cars: car });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//---------------------------------------------------------------
//4- Update Car
export const updateCar = async (req, res, next) => {
  try {
    const { name, model, rental_status } = req.body;
    const { id } = req.params;
    // Create an update object with only the fields that are provided
    const updateFields = {};
    if (name) updateFields.name = name;
    if (model) updateFields.model = model;
    if (rental_status) updateFields.rental_status = rental_status;


    const currentCar = await Car.findOne({
      _id: new ObjectId(id)
    });
    if (!currentCar) {
      return res.status(404).json({ message: "Car not found." });
    }

    // Use the current values if new values are not provided
    const newName = name || currentCar.name;
    const newModel = model || currentCar.model;

    // check the name and model together unique
    const existingCar = await Car.findOne({
      _id: { $ne: id },
      name: newName,
      model: newModel,
    });

    if (existingCar) {
      return res
        .status(400)
        .json({ message: "Car with this name and model already exists." });
    }

    const result = await Car.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Car not found." });
    }

    return res.status(200).json({ message: "Car updated successfully." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//--------------------------------------------------------------
//5- Delete Car
export const deleteCar = async (req, res, next) => {
  const { id } = req.params;

  try {
    const car = await Car.deleteOne({ _id: new ObjectId(id) });
    if (car.deletedCount === 0) {
      return res.status(404).json({ message: "Car not found." });
    }
    return res.status(200).json({ message: "This Car has been deleted." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//-------------------------------------------------------
export const AllCarSpecificModel = async (req, res, next) => {
  try {
    const { model } = req.query;

    // Check if model parameter exists
    if (!model) {
      return res
        .status(400)
        .json({ message: "Model query parameter is required." });
    }

    // Find cars with the specified models available
    const cars = await Car.find({
      model,
     
    }).toArray();
    if (cars.length === 0) {
      return res.status(200).json({ message: `No Car in Model ${model}` });
    }
    // Return the found cars
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//-------------------------------------------------------
// all car available in specific model
// /2- Get Available Cars of a Specific Model.

export const availableCarSpecificModel = async (req,res,next) =>{
  try{
     const { model } = req.query;

     // Check if model parameter exists
     if (!model) {
       return res
         .status(400)
         .json({ message: "Model query parameter is required." });
     }

     // Find cars with the specified models available
     const cars = await Car.find({ model,   rental_status: "available"}).toArray();
     if(cars.length === 0){
           return res.status(200).json({message:`No Car in Model ${model}`});

     }
     // Return the found cars
     return res.status(200).json(cars);

  }catch(error){
        return res.status(500).json({ message: error.message });

  }

}