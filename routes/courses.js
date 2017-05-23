const express = require('express');
const router = express.Router();
const data = require('../data');
const coursesData = data.courses;
const commentsData = data.comments;
const usersData = data.users;



router.post("/addFavorite", (req, res) => {
    if (req.user) {
        if(req.body.isLiked == 1){
            usersData.removeCourseFromFavorite(req.user._id, req.body.favouritecCourseNumber);
            res.redirect(req.body.lastUrl);
        }
        else{
            usersData.addCourseToFavorite(req.user._id, req.body.favouritecCourseNumber);
            res.redirect(req.body.lastUrl);
        }
    }
    else{
        req.flash('Message', 'Please login');
        res.redirect(req.body.lastUrl);
    }
});

//get all courses
router.get("/:universityName", (req, res) => {
    let departmentsData;
    coursesData.getDepartmentsByUniversity(req.params.universityName).then((departments) => {
        departmentsData = departments
    }).then(()=>{
        coursesData.getCoursesByUniversity(req.params.universityName).then((coursesList) => {
            res.render("university/university-courses", {theUrl: req.originalUrl, universityName:req.params.universityName, 
                                                            departmentList: departmentsData, UniversityCourseList: coursesList, loginuser: req.user });
        });
    }).catch((error)=>{
        res.status(500).json({error: error});
    });
});

//get comments of one course
router.get("/:universityName/courses/:courseId", (req, res) => {
    let thisCourse;
    let departmentsData;
    let num = 0;
    
    coursesData.getCourseByDbId(req.params.courseId).then((course)=> {
        thisCourse = course;

        if(req.user){
            usersData.getUserByUsername(req.user.username).then((newUser) => {
                let allFavoriteCourses = newUser.favoriteCourses;
                for (let i = 0; i < allFavoriteCourses.length; i++) {
                    if (allFavoriteCourses[i] == course.courseNumber) {
                        num = 1;
                        break;
                    } else {
                        num = 0;
                    }
                }
            });
        }
        return course
    }).then((course)=>{
        coursesData.getDepartmentsByUniversity(req.params.universityName).then((departments) => {
            departmentsData = departments
            return departments;
        }).then((data)=>{
            commentsData.getCommentsByCourseId(req.params.courseId).then((comments) => {
                let showRating;
                if(!thisCourse.rating){
                    showRating = "Nobody Rated"
                }
                else{
                    showRating = thisCourse.rating.toFixed(1)
                }
                if(num == 1){
                    res.render("university/main-content", {message: req.flash('Message'), isLiked: num, theUrl: req.originalUrl, departmentList: departmentsData,courseNumber: thisCourse.courseNumber, name: thisCourse.name, totalRating: showRating,
                                                        universityName: req.params.universityName, professor: thisCourse.professor, textbooks: thisCourse.textbooks,
                                                        subject: thisCourse.subject, description: thisCourse.description, comments: comments, loginuser: req.user,
                                                        courseIdd: thisCourse._id});
                }
                else{
                    res.render("university/main-content", {message: req.flash('Message'), theUrl: req.originalUrl, departmentList: departmentsData,courseNumber: thisCourse.courseNumber, name: thisCourse.name, totalRating: showRating,
                                                        universityName: req.params.universityName, professor: thisCourse.professor, textbooks: thisCourse.textbooks,
                                                        subject: thisCourse.subject, description: thisCourse.description, comments: comments, loginuser: req.user,
                                                        courseIdd: thisCourse._id});
                }
            
            })
        });
    }).catch(() => {
        res.status(404).json({error: "course not found!"});
    });
    
    
});

module.exports = router;
