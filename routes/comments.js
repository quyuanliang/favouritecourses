const express = require('express');
const router = express.Router();
const data = require("../data");
const route = require("../routes");
const coursesData = data.courses;
const commentsData = data.comments;
const courseRouter = route.courses;



router.post("/addComment", (req, res) => {
    if (req.user) {
        commentsData.addComment(req.user._id, req.body.courseId, req.user.username , req.body.comments, req.body.scores)
            .then((comment) => {
                res.redirect(req.body.lastUrl);
            }).catch((e) => {
                res.status(500).json({error: e});
            });
    }
    else{
        res.redirect(req.body.lastUrl);
    }
});
module.exports = router;