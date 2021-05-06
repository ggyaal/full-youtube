import express from "express";
import {
  deleteVideo,
  updateVideo,
  uploadVideo,
  view,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", view);
videoRouter.get("/upload", uploadVideo);
videoRouter.get("/update", updateVideo);
videoRouter.get("/delete", deleteVideo);

export default videoRouter;
