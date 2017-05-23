const xss = require('xss');
const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const flash = require("req-flash");

router.get('/login', function (req, res) {
    res.render('pages/login');
});

router.get('/loginAgain', function (req, res) {
    req.flash('Message', 'Wrong user or wrong password! Please retry!');
    res.render('pages/login',{ message: req.flash('Message') });
});

module.exports = router;


