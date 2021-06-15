import routes from "./routes";

export const localsware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "ggyaaltube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.session.user;
  next();
};
