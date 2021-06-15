import express from "express";
import {
  deleteVideo,
  updateVideo,
  getUploadVideo,
  view,
  postUploadVideo,
} from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.VIEW, view);
videoRouter.get(routes.UPDATE_VIDEO, updateVideo);
videoRouter.get(routes.DELETE_VIDEO, deleteVideo);
videoRouter
  .route(routes.UPDATE_VIDEO)
  .get(getUploadVideo)
  .post(postUploadVideo);

export default videoRouter;
