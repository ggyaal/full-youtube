import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createAt: "desc" });
  res.render("home", { videos });
};
export const search = (req, res) => res.render("search");

export const view = (req, res) => res.render("view");

export const getUploadVideo = (req, res) => res.render("uploadVideo");

export const postUploadVideo = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;

  try {
    await Video.create({
      title,
      description,
      fileUrl: location,
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};

export const deleteVideo = (req, res) => res.render("deleteVideo");
