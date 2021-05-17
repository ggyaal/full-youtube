import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_PROVIDER, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once("open", () => console.log("✅ Conneted Mongo DB "));

db.on("error", (error) => console.log(`❌ ERROR DB:${error}`));
