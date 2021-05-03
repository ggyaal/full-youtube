import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "GgyaalTube";
  res.locals.routes = routes;
  next();
};
