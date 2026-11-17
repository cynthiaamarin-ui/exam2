// Subject service
class Subject {
    constructor(name, description) {
        this.id = Date.now().toString() + Math.random().toString(36).slice(2, 7);
        this.name = name;
        this.description = description;
    }
}

// Temporary in-memory subject collection
const subjects = [
    new Subject(
        "Mathematics",
        "Get help with math courses and assignments."
    ),
    new Subject(
        "Computer Science",
        "Get help with programming and computer science courses."
    ),
    new Subject(
        "Biology",
        "Get help understanding biology concepts and coursework."
    )
];

function getAllSubjects() {
    return subjects;
}

function getSubjectById(id) {
    return subjects.find(subject => subject.id === id);
}

module.exports = {
    Subject,
    getAllSubjects,
    getSubjectById
};