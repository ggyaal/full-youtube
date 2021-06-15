import express from "express";
import {
  remove,
  edit,
  user,
  githubAuth,
  githubCallback,
} from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.PROFILE, user);
userRouter.get(routes.USER_EDIT, edit);
userRouter.get(routes.USER_DELETE, remove);
userRouter.get(routes.GITHUB_AUTH, githubAuth);
userRouter.get(routes.GITHUB_CALLBACK, githubCallback);

export default userRouter;
