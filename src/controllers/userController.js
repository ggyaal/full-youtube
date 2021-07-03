import bcrypt from "bcrypt";
import User from "../models/User";
import fetch from "node-fetch";
import routes from "../routes";
import { deleteObjectFormS3 } from "../middlewares";

export const getLogin = (req, res) => res.render("login");

export const postLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .render("login", { err: "가입된 이메일이 아닙니다." });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res
        .status(400)
        .render("login", { err: "비밀번호가 틀렸습니다.." });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect(routes.HOME);
};

export const getJoin = (req, res) => res.render("join");

export const postJoin = async (req, res) => {
  const {
    body: { email, name, password, password1 },
  } = req;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res.render("join", { err: "이미 가입된 이메일입니다!" });
  } else if (password !== password1) {
    return res.render("join", { err: "두 비밀번호가 일치하지 않습니다." });
  } else {
    const user = await User.create({
      email,
      name,
      password,
    });
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect(routes.HOME);
  }
};

export const githubAuth = (req, res) => {
  const baseURL = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_ID,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const AUTH_URL = `${baseURL}?${params}`;

  return res.redirect(AUTH_URL);
};

export const githubCallback = async (req, res) => {
  const baseURL = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_ID,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const AUTH_URL = `${baseURL}?${params}`;

  const tokenReq = await (
    await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenReq) {
    const apiURL = "https://api.github.com";
    const { access_token } = tokenReq;

    const userData = await (
      await fetch(`${apiURL}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiURL}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find(
      (emailOpt) => emailOpt.primary === true && emailOpt.verified === true
    );

    if (!emailObj) return res.redirect(routes.LOGIN);
    const { email } = emailObj;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.githubId) {
        await User.findByIdAndUpdate(user._id, {
          githubId: user.githubId,
        });
      }
    } else {
      user = await User.create({
        email,
        name: userData.name,
        githubId: userData.id,
        avatar: userData.avatar_url,
        password: "",
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect(routes.HOME);
  } else {
    res.redirect(routes.LOGIN);
  }
};

export const user = async (req, res) => {
  const {
    params: { id },
  } = req;

  const user = await User.findById(id);

  return res.render("user", { user });
};

export const getEdit = (req, res) => res.render("edit");
export const postEdit = async (req, res) => {
  const {
    body: { name },
    file,
    session: { user },
  } = req;
  let isAvatarUpdate = true;

  if (user.avatar && !file?.location) {
    isAvatarUpdate = false;
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, {
    name,
    avatar: file?.location || user.avatar,
  });

  if (updatedUser && isAvatarUpdate && user.avatar) {
    deleteObjectFormS3("avatars", user.avatar.split("/avatars/")[1]);
  }

  req.session.user.avatar = file?.location || user.avatar;
  req.session.user.name = name || user.name;
  return res.redirect(routes.HOME);
};
export const remove = (req, res) => res.render("delete");
