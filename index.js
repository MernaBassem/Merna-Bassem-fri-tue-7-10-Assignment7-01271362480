import express from "express";
import { connectionDB } from "./DB/connection.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));
connectionDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
