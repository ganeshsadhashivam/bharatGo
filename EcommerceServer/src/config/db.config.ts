import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

export const connectToDatabase = async () => {
  console.log(process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected to MongoDB");
};
