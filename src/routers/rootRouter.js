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
import { onlyLoggedIn, onlyLoggedOut } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get(routes.HOME, home);
rootRouter.route(routes.JOIN).all(onlyLoggedOut).get(getJoin).post(postJoin);
rootRouter.route(routes.LOGIN).all(onlyLoggedOut).get(getLogin).post(postLogin);
rootRouter.get(routes.LOGOUT, onlyLoggedIn, logout);
rootRouter.get(routes.SEARCH, search);

export default rootRouter;
