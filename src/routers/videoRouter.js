import express from "express";
import {
  deleteVideo,
  updateVideo,
  uploadVideo,
  view,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", view);
videoRouter.get("/:id(\\d+)/update", updateVideo);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", uploadVideo);

export default videoRouter;
