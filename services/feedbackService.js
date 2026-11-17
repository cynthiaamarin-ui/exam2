// Feedback service
class Feedback {
    constructor(studentEmail, tutor, subject, rating, comments) {
        this.id = Date.now().toString() + Math.random().toString(36).slice(2, 7);
        this.studentEmail = studentEmail;
        this.tutor = tutor;
        this.subject = subject;
        this.rating = rating;
        this.comments = comments;
        this.dateSubmitted = new Date();
    }
}

// Temporary in-memory feedback collection
const feedbackList = [];

function submitFeedback(studentEmail, tutor, subject, rating, comments) {
    const feedback = new Feedback(
        studentEmail,
        tutor,
        subject,
        rating,
        comments
    );

    feedbackList.push(feedback);
    return feedback;
}

function getAllFeedback() {
    return feedbackList;
}

module.exports = {
    Feedback,
    submitFeedback,
    getAllFeedback
};