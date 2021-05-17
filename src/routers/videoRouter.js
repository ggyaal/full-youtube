import express from "express";
import {
  deleteVideo,
  updateVideo,
  getUploadVideo,
  view,
  postUploadVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", view);
videoRouter.get("/:id([0-9a-f]{24})/update", updateVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter.route("/upload").get(getUploadVideo).post(postUploadVideo);

export default videoRouter;
