const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');
const bcrypt = require('bcryptjs');
const xss = require('xss');

let exportedMethods = {
    updateUser(id, updatedEmail, updatedUniversity, updatedMajor) {
        let updatedUser = {
            email: updatedEmail,
            university: updatedUniversity,
            major: updatedMajor,
        };
        let updateCommand = {
            $set: updatedUser
        };
        return users().then((userCollection) => {
            return userCollection.updateOne({ _id: id }, updateCommand).then(() => {
                return this.getUserById(id);
            });
        });

    },

    getAllUsers() {
        return users().then((userCollection) => {
            return userCollection.find({}).toArray();
        });
    },
    getUserById(id) {
        return users().then((userCollection) => {
            return userCollection.findOne({ _id: id }).then((user) => {
                if (!user) return Promise.reject("User not found");
                return user;
            });
        });
    },
    getUserByUsername(username) {
        return users().then((userCollection) => {
            return userCollection.findOne({ username: username }).then((user) => {
                return user;
            });
        });
    },
    getUserByUsernameOrEmail(username, email) {
        return users().then((userCollection) => {
            return userCollection.findOne({ $or: [{ username: username }, { email: email }] }).then((user) => {
                return user;
            });
        });
    },
    addUser(username, hashedPassword, email, university, major) {
        //need error checking here

        if (username === undefined || username === "") return Promise.reject("No username given");
        //if (email === undefined || email === "") return Promise.reject("No email given");
        if (hashedPassword === undefined || hashedPassword === "") return Promise.reject("No password given");
        return users().then((userCollection) => {
            let newUser = {
                _id: uuid.v4(),
                username: username.toLowerCase(),
                password: hashedPassword,
                email: email,
                university: university,
                major: major,
                favoriteCourses: []
                //pollsCreated: [],
                //pollsVotedIn: []
            };
            return userCollection.insertOne(newUser).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getUserById(newId);
            });
        });
    },

    createHashedPassword(password) {
        return new Promise((fulfill, reject) => {
            if (!password) reject("Password not given");
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) reject(err);
                    fulfill(hash);
                });
            });
        });
    },

    removeUser(id) {
        return users().then((userCollection) => {
            return userCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete user with id of ${id}`)
                }
            });
        });
    },
    //add a course to a user's favoriteCourses array
    addCourseToFavorite(userId, courseNumber) {
        return users().then((userCollection) => {
            return userCollection.updateOne({ _id: userId }, {
                $addToSet: {
                    favoriteCourses: courseNumber
                }
            });
        });
    },

    //remove a course from a user's favoriteCourses array
    removeCourseFromFavorite(userId, courseNumber) {
        return users().then((userCollection) => {
            return userCollection.updateOne({ _id: userId }, {
                $pull: {
                    favoriteCourses: courseNumber
                }
            });
        });
    },

    isPasswordValid(user, password) {
        return new Promise((fulfill, reject) => {
            if (!user) reject("User not given");
            if (!password) reject("Password not given");
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) reject(err);
                fulfill(res);
            });
        });
    }
}

module.exports = exportedMethods;
