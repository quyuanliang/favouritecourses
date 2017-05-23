const mongoCollections = require("../config/mongoCollections");
const courses = mongoCollections.courses;
const uuid = require('node-uuid');

let exportedMethods = {

    //returns an array of all courses
    getAllCourses() {
        return courses().then((courseCollection) => {
            return courseCollection.find({}).toArray();
        });
    },

    //returns a course by given database id. if do not exist, return undefined (do not throw an error).
    getCourseByDbId(id) {
        return courses().then((courseCollection) => {
            return courseCollection.findOne({ _id: id }).then((course) => {
                return course;
            });
        });
    },

    //returns an array of courses by given course name. returns empty array if no one matches.
    getCoursesByName(name) {
        return courses().then((courseCollection) => {
            return courseCollection.find({ name: name }).toArray();
        });
    },

    //returns an array of courses by given university. returns empty array if no one matches.
    getCoursesByUniversity(university) {
        return courses().then((courseCollection) => {
            return courseCollection.find({ university: university }).toArray();
        });
    },

    //returns an array of departments by given university. returns empty array if no one matches.
    getDepartmentsByUniversity(university) {
        return this.getCoursesByUniversity(university).then((courses) => {
            let map = {};
            for (let i = 0; i < courses.length; i++) {
                if(!map[courses[i].subject]){
                    map[courses[i].subject] = {
                        department: courses[i].subject,
                        courses: []
                    };
                }
                map[courses[i].subject].courses.push(courses[i]);
            }
            return map;
        });
    },

    //returns an array of courses by given course number. returns empty array if no one matches.
    getCoursesByCourseNumber(courseNumber) {
        return courses().then((courseCollection) => {
            return courseCollection.find({ courseNumber: courseNumber }).toArray();
        });
    },

    //returns an array of courses by given professor. returns empty array if no one matches.
    getCoursesByProfessor(professor) {
        return courses().then((courseCollection) => {
            return courseCollection.find({ professor: professor }).toArray();
        });
    },

    //returns an array of courses by given subject. returns empty array if no one matches.
    getCoursesBySubject(subject) {
        return courses().then((courseCollection) => {
            return courseCollection.find({ subject: subject }).toArray();
        });
    },

    //add a course with given information to the database, and returns this course. rating is set as undefined before first comment is made.
    addCourse(name, university, courseNumber, professor, textbooks, subject, description) {
        return courses().then((courseCollection) => {
            let newCourse = {
                _id: uuid.v4(),
                name: name,
                university: university,
                courseNumber: courseNumber,
                professor: professor,
                textbooks: textbooks,
                subject: subject,
                description: description,
                rating: undefined,
                ratingNumber: 0,
            };

            return courseCollection.insertOne(newCourse).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getCourseByDbId(newId);
            });
        });
    },

    //remove a course with given database id from databese. Throw an error if do not exist
    removeCourse(id) {
        return courses().then((courseCollection) => {
            return courseCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`No such Id!`);
                }
            });
        });
    },

    //update a course's information with given data. keep the input data same as before if not changed. returns the updated course. 
    updateCourse(id, updatedName, updatedUniversity, updatedCourseNumber, updatedProfessor, updatedTextbooks, updatedSubject, updatedDescription) {
        return courses().then((courseCollection) => {
            let updateInfo = {
                name: updatedName,
                university: updatedUniversity,
                courseNumber: updatedCourseNumber,
                professor: updatedProfessor,
                textbooks: updatedTextbooks,
                subject: updatedSubject,
                description: updatedDescription
            };

            let updateCommand = {
                $set: updateInfo
            };

            return courseCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                return this.getCourseByDbId(id);
            });
        });
    },

    addCourseRating(id, rating) {
        return courses().then((courseCollection) => {
            return this.getCourseByDbId(id).then((course) => {
                let newRating;
                if (!course.rating || course.ratingNumber == 0) {
                    newRating = rating;
                } else {
                    newRating = (course.rating * course.ratingNumber + rating) / (course.ratingNumber + 1);
                }
                let updateInfo = {
                    rating: newRating,
                    ratingNumber: course.ratingNumber + 1
                };

                let updateCommand = {
                    $set: updateInfo
                };

                return courseCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                    return this.getCourseByDbId(id);
                });
            });
        });
    },

    updateCourseRating(id, newRating, oldRating) {
        return courses().then((courseCollection) => {
            return this.getCourseByDbId(id).then((course) => {
                let rating;
                if (!course.rating || course.ratingNumber == 0) {
                    rating = newRating;
                } else {
                    rating = (course.rating * course.ratingNumber - oldRating + newRating) / (course.ratingNumber);
                }
                let updateInfo = {
                    rating: rating
                };

                let updateCommand = {
                    $set: updateInfo
                };

                return courseCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                    return this.getCourseByDbId(id);
                });
            });
        });
    }

}

module.exports = exportedMethods;