import mongoose from "mongoose";
export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost/petBuddyDataBase");
    console.log("Db created");
  } catch (error: any) {
    throw new Error("Database connection failed");
  }
}
