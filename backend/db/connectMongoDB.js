import mongoose from "mongoose";

export const connectMongoDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(`Error conecting Databas: ${error.message}`);
  }
};
