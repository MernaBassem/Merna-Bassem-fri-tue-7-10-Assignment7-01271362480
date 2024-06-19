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
    if (checkUserID==null) {
      return res.status(401).json({ message: "Car Or User Not Found" });
    }
    // check car found
    const checkCarID = await Car.findOne({
      _id: new ObjectId(carId),
    });
    console.log("Car Data", checkCarID);
    if (checkCarID==null) {
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
