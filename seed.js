const data = require("./data");
const courseData = data.courses;
const commentData = data.comments;

let course1 = {
    name: "Web Programming",
    university: "sit",
    courseNumber: "CS 546",
    professor: "Philip Barresi",
    textbooks: [
        "book1",
        "book2"
    ],
    subject: "Computer Science",
    description: "This is a web programming course. In this course, you can learn web programming languages such as Node.js, css, jQuery, html and  you can build a website by yourself after this course. There will be ten labs and one group assignment. It's great!"
}

let course2 = {
    name: "Database",
    university: "sit",
    courseNumber: "CS 561",
    professor: "Kim",
    textbooks: [
        "book3",
        "book4"
    ],
    subject: "Computer Science",
    description: "Database Course."
}

let course3 = {
    name: "TCP/IP",
    university: "sit",
    courseNumber: "CS 550",
    professor: "Mike",
    textbooks: [
        "book5",
        "book6"
    ],
    subject: "Computer Science",
    description: "TCP Course."
}


let course4 = {
    name: "BIA Course",
    university: "sit",
    courseNumber: "BIA 535",
    professor: "John",
    textbooks: [
        "book7",
        "book8"
    ],
    subject: "Business",
    description: "Business Course"
}

let course5 = {
    name: "Android",
    university: "sit",
    courseNumber: "CS 549",
    professor: "Duggan",
    textbooks: [
        "book5",
        "book6"
    ],
    subject: "Computer Science",
    description: "Android Course."
}

let course6 = {
    name: "Enterprise Software",
    university: "sit",
    courseNumber: "CS 548",
    professor: "Duggan",
    textbooks: [
        "book5",
        "book6"
    ],
    subject: "Computer Science",
    description: "Enterprise Software Course."
}

let course7 = {
    name: "Java",
    university: "sit",
    courseNumber: "EE 810",
    professor: "Kuger",
    textbooks: [
        "book5",
        "book6"
    ],
    subject: "Electrical Engineering",
    description: "EE Java Software Course."
}

let course8 = {
    name: "Market",
    university: "sit",
    courseNumber: "FI 548",
    professor: "Mike",
    textbooks: [
        "book5",
        "book6"
    ],
    subject: "Finance",
    description: "Finance Marketing Course."
}

let course9 = {
    name: "Civil Engineering",
    university: "sit",
    courseNumber: "CE 548",
    professor: "Duggan",
    textbooks: [
        "book5",
        "book6"
    ],
    subject: "Civil Engineering",
    description: "Civil Engineering Course."
}

let course10 = {
    name: "R Studio",
    university: "sit",
    courseNumber: "FE 548",
    professor: "Duggan",
    textbooks: [
        "book5",
        "book6"
    ],
    subject: "Finance Engineering",
    description: "R lanuage Course."
}

let course11 = {
    name: "American History",
    university: "sit",
    courseNumber: "HI 548",
    professor: "Duggan",
    textbooks: [
        "book5",
        "book6"
    ],
    subject: "History",
    description: "History Course."
}

let course12 = {
    name: "Web Programming2",
    university: "sit",
    courseNumber: "CS 554",
    professor: "Philip Barresi",
    textbooks: [
        "book1",
        "book2"
    ],
    subject: "Computer Science",
    description: "This is a web programming course. In this course, you can learn web programming languages such as Node.js, css, jQuery, html and  you can build a website by yourself after this course. There will be ten labs and one group assignment."
}

let course13 = {
    name: "Web Programming3",
    university: "sit",
    courseNumber: "CS 555",
    professor: "Philip Barresi",
    textbooks: [
        "book1",
        "book2"
    ],
    subject: "Computer Science",
    description: "This is a web programming course. In this course, you can learn web programming languages such as Node.js, css, jQuery, html and  you can build a website by yourself after this course. There will be ten labs and one group assignment."
}

courseData.addCourse(course1.name, course1.university, course1.courseNumber, course1.professor, course1.textbooks, course1.subject, course1.description).then((newCourse) => {
    commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5e", newCourse._id, "Yuanliang Qu", "I learnt many things!!!", 5)
        .then((newComment) => {
            commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5f", newComment.courseId, "Yaoqi Du", "This course is very good!!!", 5)
                .then((newComment) => {
                    courseData.addCourse(course2.name, course2.university, course2.courseNumber, course2.professor, course2.textbooks, course2.subject, course2.description).then((newCourse) => {
                        courseData.addCourse(course3.name, course3.university, course3.courseNumber, course3.professor, course3.textbooks, course3.subject, course3.description).then((newCourse) => {
                            courseData.addCourse(course4.name, course4.university, course4.courseNumber, course4.professor, course4.textbooks, course4.subject, course4.description).then((newCourse) => {
                                courseData.addCourse(course5.name, course5.university, course5.courseNumber, course5.professor, course5.textbooks, course5.subject, course5.description).then((newCourse) => {
                                    courseData.addCourse(course6.name, course6.university, course6.courseNumber, course6.professor, course6.textbooks, course6.subject, course6.description).then((newCourse) => {
                                        courseData.addCourse(course7.name, course7.university, course7.courseNumber, course7.professor, course7.textbooks, course7.subject, course7.description).then((newCourse) => {
                                            courseData.addCourse(course8.name, course8.university, course8.courseNumber, course8.professor, course8.textbooks, course8.subject, course8.description).then((newCourse) => {
                                                courseData.addCourse(course9.name, course9.university, course9.courseNumber, course9.professor, course9.textbooks, course9.subject, course9.description).then((newCourse) => {
                                                    courseData.addCourse(course10.name, course10.university, course10.courseNumber, course10.professor, course10.textbooks, course10.subject, course10.description).then((newCourse) => {
                                                        courseData.addCourse(course11.name, course11.university, course11.courseNumber, course11.professor, course11.textbooks, course11.subject, course11.description).then((newCourse) => {
                                                            courseData.addCourse(course12.name, course12.university, course12.courseNumber, course12.professor, course12.textbooks, course12.subject, course12.description).then((newCourse) => {
                                                                courseData.addCourse(course13.name, course13.university, course13.courseNumber, course13.professor, course13.textbooks, course13.subject, course13.description).then((newCourse) => {
                                                                })
                                                            })

                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
        })
})



let course111 = {
    name: "Web Programming",
    university: "mit",
    courseNumber: "CS 600",
    professor: "Philip Barresi",
    textbooks: [
        "book1",
        "book2"
    ],
    subject: "Computer Science",
    description: "This is a web programming course. In this course, you can learn web programming languages such as Node.js, css, jQuery, html and  you can build a website by yourself after this course. There will be ten labs and one group assignment."
}

let course222 = {
    name: "Database",
    university: "mit",
    courseNumber: "CS 500",
    professor: "Kim",
    textbooks: [
        "book3",
        "book4"
    ],
    subject: "Computer Science",
    description: "Database Course."
}

let course333 = {
    name: "TCP/IP",
    university: "mit",
    courseNumber: "CS 400",
    professor: "Mike",
    textbooks: [
        "book5",
        "book6"
    ],
    subject: "Computer Science",
    description: "TCP Course."
}

let course444 = {
    name: "BIA Course",
    university: "mit",
    courseNumber: "BIA 300",
    professor: "John",
    textbooks: [
        "book7",
        "book8"
    ],
    subject: "Business",
    description: "Business Course"
}


courseData.addCourse(course111.name, course111.university, course111.courseNumber, course111.professor, course111.textbooks, course111.subject, course111.description)
    .then((newCourse) => {
        commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5e", newCourse._id, "546User1", "546Good!!!", 5)
            .then((newComment) => {
                commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5e", newComment.courseId, "546User2", "546Bad!!!", 2)
                    .then((newComment) => {
                        courseData.addCourse(course222.name, course222.university, course222.courseNumber, course222.professor, course222.textbooks, course222.subject, course222.description)
                            .then((newCourse) => {
                                commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5e", newCourse._id, "561User1", "561Not Good!!!", 3)
                                    .then((newComment) => {
                                        commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5e", newComment.courseId, "561User2", "561Good!!!", 5)
                                            .then((newComment) => {
                                                courseData.addCourse(course333.name, course333.university, course333.courseNumber, course333.professor, course333.textbooks, course333.subject, course333.description)
                                                    .then((newCourse) => {
                                                        commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5e", newCourse._id, "550User1", "550Not Good!!!", 3)
                                                            .then((newComment) => {
                                                                commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5e", newComment.courseId, "550User2", "550Good!!!", 5)
                                                                    .then((newComment) => {
                                                                        courseData.addCourse(course444.name, course444.university, course444.courseNumber, course444.professor, course444.textbooks, course444.subject, course444.description)
                                                                            .then((newCourse) => {
                                                                                commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5e", newCourse._id, "535User1", "535Good!!!", 5)
                                                                                    .then((newComment) => {
                                                                                        commentData.addComment("c196b704-e29f-4308-b3be-98979e4b2f5e", newComment.courseId, "535User2", "535Good!!!", 4)
                                                                                            .then((newComment) => {
                                                                                            })
                                                                                    })
                                                                            })
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    });
