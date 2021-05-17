import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  githubId: String,
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 7);
});

const User = mongoose.model("User", userSchema);

export default User;
