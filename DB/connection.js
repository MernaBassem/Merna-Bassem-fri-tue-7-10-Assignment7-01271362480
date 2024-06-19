// connection
import { MongoClient } from "mongodb";

const mongodbURL = "mongodb://localhost:27017";
export const mongoClient = new MongoClient(mongodbURL);
const db_name = "car_rental_system";
let db, User, Car, Rental;
export const connectionDB = async () => {
  try {
    await mongoClient.connect();
    // create database
    db = mongoClient.db(db_name);
    User = db.collection("users");
   Rental = db.collection("rental");


    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

export { db, User, Car, Rental };
