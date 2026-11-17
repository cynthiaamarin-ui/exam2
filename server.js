const express = require("express");
const helmet = require("helmet");
const app = express();


app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use(express.static("public"));

// Student routes
const studentRoutes = require("./routes/studentRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

app.use(studentRoutes);
app.use(appointmentRoutes);
app.use(feedbackRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render("index");

});
app.get("/tutors", (req, res) => {
    try {
        const tutorService = require("./services/tutorService");
        const subjectService = require("./services/subjectService");

        const tutors = tutorService.getAllTutors();
        const subjects = subjectService.getAllSubjects();

        res.render("tutors", {
            tutors: tutors,
            subjects: subjects
        });
    } catch (error) {
        console.error("Error loading tutors:", error);
        res.status(500).send("Unable to load tutors.");
    }
});

app.get("/register", (req, res) => {
    res.render("register", {
        success: req.query.success === "true"
    });
});
app.get("/students", (req, res) => {
    try {
        const students = require("./services/studentService").getAllStudents();

        res.render("students", {
            students: students
        });
    } catch (error) {
        console.error("Error loading students:", error);
        res.status(500).send("Unable to load students.");
    }
});
app.get("/feedback", (req, res) => {
    res.render("feedback", {
        success: req.query.success === "true"
    });
});
const errorHandler = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");

app.use(errorHandler);
app.use(notFoundMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
