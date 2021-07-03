import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import routes from "./routes";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const deleteObjectFormS3 = (folderName, objName) => {
  s3.deleteObject(
    {
      Bucket: `${process.env.AWS_BUCKET}/${folderName}`,
      Key: objName,
    },
    function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    }
  );
};

export const localsware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "ggyaaltube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.session.user;
  next();
};

export const uploadAvator = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET + "/avatars",
    acl: "public-read",
  }),
});

export const uploadVideo = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET + "/videos",
    acl: "public-read",
  }),
});

export const onlyLoggedIn = (req, res, next) => {
  const {
    session: { user },
  } = req;
  if (user) next();
  else return res.status(403).redirect(routes.HOME);
};

export const onlyLoggedOut = (req, res, next) => {
  const {
    session: { user },
  } = req;
  if (!user) next();
  else return res.status(403).redirect(routes.HOME);
};
