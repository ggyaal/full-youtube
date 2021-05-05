import express from "express";
import { home } from "../Controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);

export default globalRouter;
