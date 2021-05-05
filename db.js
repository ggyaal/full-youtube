import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once("open", () => console.log("✅ Conneted Mongo DB "));

db.on("error", (error) => console.log(`❌ ERROR DB:${error}`));
