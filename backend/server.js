import express from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "./db/connectMongoDB.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //to parse request.body, parsing json
app.use(express.urlencoded({ extended: true })); //to parse form data

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server is running!");
  connectMongoDB();
});
