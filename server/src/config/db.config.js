import mongoose from "mongoose";
import "dotenv/config";

const URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(URI);

    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
