const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const courseData = require("./courses");
const uuid = require('node-uuid');

let exportedMethods = {

    //returns an array of comments add by this user. returns empty array if no one matches.
    getCommentsByUserId(userId) {
        return comments().then((commentCollection) => {
            return commentCollection.find({ userId: userId }).toArray();
        });
    },

    //returns an array of comments under this course. returns empty array if no one matches.
    getCommentsByCourseId(courseId) {
        return comments().then((commentCollection) => {
            return commentCollection.find({ courseId: courseId }).toArray();
        });
    },

    //returns a single comment by database id. if do not exist, return undefined (do not throw an error).
    getCommentByDbId(id) {
        return comments().then((commentCollection) => {
            return commentCollection.findOne({ _id: id }).then((comment) => {
                return comment;
            });
        });
    },


    //add a comment to the database with given information, with the date when added, and returns this comment
    //date will be set as date now
    //rating of this course will be recomputed with given rating
    addComment(userId, courseId, username, content, rating) {
        return comments().then((commentCollection) => {
            let date = new Date();
            let newComment = {
                _id: uuid.v4(),
                userId: userId,
                courseId: courseId,
                username: username,
                content: content,
                date: date.toLocaleString(),
                rating: parseFloat(rating)
            };

            return courseData.addCourseRating(courseId, parseFloat(rating)).then((course) => {
                return commentCollection.insertOne(newComment).then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                }).then((newId) => {
                    return this.getCommentByDbId(newId);
                });
            });
        });
    },

    //remove a comment by database id. Throw an error if do not exist. rating will not be recomputed
    removeComment(id) {
        return comments().then((commentCollection) => {
            return commentCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`No such Id!`);
                }
            });
        });
    },

    //update a comment with given information to a comment, given comment id. if one of content or rating is not changed, give the updated data same as before.
    //rating of this course will be recomputed with given rating
    //returns the updated comment
    updateComment(id, updatedContent, updatedRating) {
        return comments().then((commentCollection) => {
            let date = new Date();
            let updateInfo = {
                content: updatedContent,
                date: date.toLocaleString(),
                rating: parseFloat(updatedRating)
            };

            let updateCommand = {
                $set: updateInfo
            };
            return this.getCommentByDbId(id).then((comment) => {
                return courseData.updateCourseRating(comment.courseId, updatedRating, comment.rating).then((course) => {
                    return commentCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                        return this.getCommentByDbId(id);
                    });
                });
            })
        });
    },

}

module.exports = exportedMethods;