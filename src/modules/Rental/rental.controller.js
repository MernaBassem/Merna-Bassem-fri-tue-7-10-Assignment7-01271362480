import { Car, Rental, User } from "../../../DB/connection.js";
import { ObjectId } from "mongodb";

// 1- add rental

export const addRental = async (req, res, next) => {
  const { carId, UserId, rental_date, return_date } = req.body;
  try {
    // check user found
    const checkUserID = await User.findOne({
      _id: new ObjectId(UserId),
    });
    console.log("User Data", checkUserID);
    if (checkUserID == null) {
      return res.status(401).json({ message: "Car Or User Not Found" });
    }
    // check car found
    const checkCarID = await Car.findOne({
      _id: new ObjectId(carId),
    });
    console.log("Car Data", checkCarID);
    if (checkCarID == null) {
      return res.status(401).json({ message: "Car Or User Not Found" });
    }
    //check car available
    if (checkCarID.rental_status === "rented") {
      return res
        .status(401)
        .json({ message: "This car is not available for rent" });
    }

    const addRental = await Rental.insertOne({
      carId,
      UserId,
      rental_date,
      return_date,
    });
    const updateCar = await Car.updateOne(
      {
        _id: new ObjectId(carId),
      },
      { $set: { rental_status: "rented" } }
    );
    return res
      .status(201)
      .json({ message: "Successfully ADD Rental ", addRental });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//----------------------------------------------------
//update rental
// 1- update rental

export const UpdateRental = async (req, res, next) => {
  const { carId, UserId, rental_date, return_date } = req.body;
  const { id } = req.params;

  try {
    const rentalData = await Rental.findOne({
      _id: new ObjectId(id),
    });
    console.log("rental Dataaaaaaaaa",rentalData)
    if (rentalData==null) {
      return res.status(404).json({ message: "rental not found." });
    }

    const updateFields = {};

    if (rental_date) updateFields.rental_date = rental_date;
    if (return_date) updateFields.return_date = return_date;
    // check user found
    if (UserId) {
      updateFields.UserId = UserId;
      const checkUserID = await User.findOne({
        _id: new ObjectId(UserId),
      });
      console.log("User Data", checkUserID);
      if (checkUserID == null) {
        return res.status(401).json({ message: "Car Or User Not Found" });
      }
    }

    // check car found
    if (carId) {
      updateFields.carId = carId;
      const checkCarID = await Car.findOne({
        _id: new ObjectId(carId),
      });
      console.log("Car Data", checkCarID);
      if (checkCarID == null) {
        return res.status(401).json({ message: "Car Or User Not Found" });
      }
      //check car available
      if (checkCarID.rental_status === "rented") {
        return res
          .status(401)
          .json({ message: "This car is not available for rent" });
      }

      const updateCar = await Car.updateOne(
        {
          _id: new ObjectId(rentalData.carId),
        },
        { $set: { rental_status: "available" } }
      );
    }

    const updateRental = await Rental.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );
    const updateCar = await Car.updateOne(
      {
        _id: new ObjectId(carId),
      },
      { $set: { rental_status: "rented" } }
    );
    return res
      .status(201)
      .json({ message: "Successfully Update Rental ", UpdateRental });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
