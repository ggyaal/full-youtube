import express from "express";
import {
  remove,
  getEdit,
  postEdit,
  user,
  githubAuth,
  githubCallback,
} from "../controllers/userController";
import { onlyLoggedIn, onlyLoggedOut, uploadAvator } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.PROFILE(), onlyLoggedIn, user);
userRouter
  .route(routes.USER_EDIT)
  .all(onlyLoggedIn)
  .get(getEdit)
  .post(uploadAvator.single("avatar"), postEdit);
userRouter.get(routes.USER_DELETE, onlyLoggedIn, remove);
userRouter.get(routes.GITHUB_AUTH, onlyLoggedOut, githubAuth);
userRouter.get(routes.GITHUB_CALLBACK, githubCallback);

export default userRouter;
