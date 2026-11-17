const feedbackService = require("../services/feedbackService");
const studentService = require("../services/studentService");

function submitFeedback(req, res) {
    try {
        const { studentEmail, tutor, subject, rating, comments } = req.body;

     if (!studentEmail || !tutor || !subject || !rating || !comments) {
    return res.status(400).send("Please complete all feedback fields.");
}

const numericRating = Number(rating);

if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return res.status(400).send("Please select a rating between 1 and 5.");
}

        const student = studentService.getAllStudents().find(
            student => student.email.toLowerCase() === studentEmail.trim().toLowerCase()
        );

        if (!student) {
            return res.status(404).send("Please register before submitting feedback.");
        }

        feedbackService.submitFeedback(
            student.email,
            tutor,
            subject,
            numericRating,
            comments
        );

        res.render("feedback-success");
    } catch (error) {
        console.error("Feedback submission error:", error);
        res.status(500).send("Unable to submit feedback.");
    }
}

function getFeedback(req, res) {
    try {
        const feedback = feedbackService.getAllFeedback();

        res.render("feedback-list", {
            feedback: feedback
        });
    } catch (error) {
        console.error("Error loading feedback:", error);
        res.status(500).send("Unable to load feedback.");
    }
}

module.exports = {
    submitFeedback,
    getFeedback
};
