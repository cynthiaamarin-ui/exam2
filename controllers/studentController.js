
const studentService = require("../services/studentService");

function registerStudent(req, res) {
    try {
        const { name, email, major, subject } = req.body;

        if (!name || !email || !major || !subject) {
            return res.status(400).send("Please complete all registration fields.");
        }

        const student = studentService.registerStudent(name, email, major, subject);

if (!student) {
    return res.status(409).render("register-error");
}

res.redirect("/register?success=true");

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Something went wrong during registration.");
    }
}

module.exports = {
    registerStudent
};
