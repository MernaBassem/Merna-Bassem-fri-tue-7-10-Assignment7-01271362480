// index.js file
import express from "express";
import { connectionDB } from "./DB/connection.js";
import UserRouter from "./src/modules/User/user.routers.js";
import CarRouter from "./src/modules/Car/car.routers.js";
import RentalRouter from "./src/modules/Rental/rental.routers.js";

const app = express();
const port = 3000;

app.use(express.json());
connectionDB();

app.use("/user", UserRouter);
app.use("/car", CarRouter);
app.use("/rental", RentalRouter);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

