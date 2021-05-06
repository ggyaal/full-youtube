import express from "express";
import { remove, edit, user } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", user);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);

export default userRouter;
