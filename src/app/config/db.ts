
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database Connection Error", error);
  }
};

export default connectDB;