import bcrypt from "bcrypt";
import User from "../models/User";


export const getLogin = (req, res) => res.render("login");

export const postLogin = async (req, res) => {
    const { body: { email, password }} = req;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).render("login", {err: "Not found user"});
        }
        const ok = await bcrypt.compare(password, user.password);
        if(!ok) {
            return res.status(400).render("login", { err: "password is incorrect" })
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    }catch(error) {
        console.log(error);
    }
};


export const getJoin = (req, res) => res.render("join");

export const postJoin = async (req, res) => {
    const { body: { email, name, password, password1 }} = req;
    if(password !== password1) {
        return res.render("join", { err: "password do not match"});
    } else {
        await User.create({
            email,
            name,
            password
        });
        return res.redirect("/");
    }
};

export const user = (req, res) => res.render("user");
export const edit = (req, res) => res.render("edit");
export const remove = (req, res) => res.render("delete");
