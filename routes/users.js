const xss = require('xss');
const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require("req-flash");

router.post("/profile", (req, res) => {
    //get user id
    usersData.getUserById(req.body.uid).then((user) => {
        res.render('pages/profile', { user: user, loginuser: req.user});
    }, (error) => {
        // Not found!
        res.status(404).json({ message: "not found!" });
    });
});

router.post("/register", function (request, response) {
    let newUser = request.body;
    if (newUser.signUpPassword != newUser.signUpPassword2) {
        //passwords do not match
        //We need to display error to user better
        request.flash('loginMessage', 'Passwords do not Match');
        response.render("pages/register", {message: request.flash('loginMessage')});
        //response.redirect("/register");
    } else {
        usersData.getUserByUsername(newUser.signUpUsername.toLowerCase(), newUser.email).then((user) => {
            if (user) {
                //Username already in system
                //We need to display error to user better
                request.flash('loginMessage', 'Username Already Exists');
                response.render("pages/register", {message: request.flash('loginMessage')});
                //response.redirect("/register");
            } else {
                usersData.createHashedPassword(xss(newUser.signUpPassword)).then((hashedPassword) => {
                    usersData.addUser(xss(newUser.signUpUsername), hashedPassword, null, null, null).then((user) => {
                        response.redirect("/register/login");
                    });
                });
            }
        })

    }
});

router.post("/chgprofile", (req, res) => {
    //get user id
    usersData.updateUser(req.body.uid, req.body.email, req.body.university, req.body.major, req.body.password).then((user) => {
        res.render('pages/profile', { user: user , loginuser: req.user});
    }, (error) => {
        // Not found!
        res.status(404).json({ message: "not found!" });
    });
});

router.post('/logout', function (request, response) {
    console.log(request.body.lastUrl)
    request.logout();
    if(request.body.lastUrl === "") response.redirect("/search");
    else response.redirect(request.body.lastUrl)
});

router.get('/myaccount', isLoggedIn, function (req, res) {
    console.log(req.user._id)
    res.render("pages/main", { loginuser: req.user });
});

router.post("/loginPage", function (request, response) {
    if (!request.isAuthenticated()) {
        response.render("pages/login", { theUrl:request.body.lastUrl, message: request.flash('loginMessage') });
    }
    else {
        response.redirect("/user");
    }
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', { failureFlash: true }, function (err, user, info) {
        if (err) { return next(err);}
        if (!user) { return res.redirect("/register/loginAgain"); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            let redirector = req.flash('redirectPage')[0];
            if (redirector !== undefined)
                return res.redirect(redirector);
            else
                if(req.body.lastUrl === "") res.redirect("/search");
                else res.redirect(req.body.lastUrl)
        });
    })(req, res, next);
});

router.get('/register', function (req, res) {
    res.render('pages/register');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else
        res.redirect('/user/login');
}

module.exports = router;












