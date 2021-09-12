import express from "express";
import {
  deleteVideo,
  getUploadVideo,
  view,
  postUploadVideo,
} from "../controllers/videoController";
import { onlyLoggedIn } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.VIEW(), view);
videoRouter.get(routes.DELETE_VIDEO(), deleteVideo);
videoRouter
  .route(routes.UPLOAD_VIDEO)
  .all(onlyLoggedIn)
  .get(getUploadVideo)
  .post(postUploadVideo);

export default videoRouter;
