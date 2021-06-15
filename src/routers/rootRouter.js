import express from "express";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
} from "../controllers/userController";
import routes from "../routes";

const rootRouter = express.Router();

rootRouter.get(routes.HOME, home);
rootRouter.route(routes.JOIN).get(getJoin).post(postJoin);
rootRouter.route(routes.LOGIN).get(getLogin).post(postLogin);
rootRouter.get(routes.LOGOUT, logout);
rootRouter.get(routes.SEARCH, search);

export default rootRouter;
