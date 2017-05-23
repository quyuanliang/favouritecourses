const express = require('express');
const router = express.Router();
const data = require('../data');
const schoolData = data.courses;
const flash = require("req-flash");

router.post("/searchSchool", (req, res) => {
    schoolData.getCoursesByUniversity(req.body.schoolname.toLowerCase()).then((courses) => {
        if(courses[0] != undefined) res.redirect("/university/"+req.body.schoolname.toLowerCase());
        else res.redirect("/search");
    }, (error) => {
        res.status(404).json({ message: "not found!" });
    });
});


module.exports = router;












