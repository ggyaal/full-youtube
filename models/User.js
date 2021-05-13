import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  pacebookId: Number,
  githubId: Number,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;