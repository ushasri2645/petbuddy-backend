import mongoose from "mongoose";
const uri = "mongodb+srv://ugudikandula:EhD2rnu8l0ZpH3Vc@cluster0.3t4zh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: 1, strict: true, deprecationErrors: true } };

export async function connectToDatabase() {
  try {
    // await mongoose.connect("mongodb://localhost/petBuddyDataBase");
    await mongoose.connect(uri);
    console.log("Db created");
  } catch (error: any) {
    throw new Error("Database connection failed");
  }
}
