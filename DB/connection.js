import { MongoClient } from "mongodb";

const mongodbURL = "mongodb://localhost:27017";
export const mongoClient = new MongoClient(mongodbURL);
const db_name = "car_rental_system";
let db;
export const connectionDB = async () => {
  try {
    await mongoClient.connect();
    console.log("Connected to the database");
    // create database
    db = mongoClient.db(db_name);
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

export { db };
