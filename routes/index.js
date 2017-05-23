const userRoutes = require("./users");
const universityRoutes = require("./university");
const registerRoutes = require("./register");
const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
const coursesRoutes = require("./courses");
const commentsRoutes = require("./comments");

const constructorMethod = (app, passport) => {
    app.use("/user", userRoutes);
    app.use("/register", registerRoutes);
    app.use("/university", coursesRoutes);
    app.use("/comments", commentsRoutes);
    app.use("/search", universityRoutes);

    app.use("*", (req, res) => {
        res.render("pages/main", {message: req.flash('loginMessage'), loginuser: req.user});
    });


};

module.exports = constructorMethod;