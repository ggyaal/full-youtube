import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  fileUrl: {
    type: String,
    required: true,
  },
  thumbnail: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  good: {
    type: Number,
    default: 0,
  },
  bad: {
    type: Number,
    default: 0,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
