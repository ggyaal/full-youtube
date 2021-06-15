const transID = (id) => {
  if (id) return id;
  return ":id([0-9a-f]{24})";
};

const routes = {
  HOME: "/",
  JOIN: "/join",
  LOGIN: "/login",
  LOGOUT: "/logout",
  SEARCH: "/search",

  PROFILE: (id) => `/${transID(id)}`,
  USER_EDIT: "/edit",
  USER_DELETE: "/delete",
  GITHUB_AUTH: "/github/auth",
  GITHUB_CALLBACK: "/github/callback",

  VIEW: (id) => `/${transID(id)}`,
  UPDATE_VIDEO: (id) => `/${transID(id)}/update`,
  DELETE_VIDEO: (id) => `/${transID(id)}/delete`,
  UPLOAD_VIDEO: "/upload",
};

export default routes;
