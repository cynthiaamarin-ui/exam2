// Tutor service
class Tutor {
    constructor(name, email, subjects, availability) {
        this.id = Date.now().toString() + Math.random().toString(36).slice(2, 7);
        this.name = name;
        this.email = email;
        this.subjects = subjects;
        this.availability = availability;
    }
}

// Temporary in-memory tutor collection
const tutors = [
    new Tutor(
        "Alex Johnson",
        "alex@utrgv.edu",
        ["Mathematics", "Computer Science"],
        "Monday - Wednesday"
    ),
    new Tutor(
        "Maria Garcia",
        "maria@utrgv.edu",
        ["Biology", "Mathematics"],
        "Tuesday - Thursday"
    ),
    new Tutor(
        "David Smith",
        "david@utrgv.edu",
        ["Computer Science"],
        "Monday - Friday"
    )
];

// Retrieve all tutors
function getAllTutors() {
    return tutors;
}

// Find a tutor by ID
function getTutorById(id) {
    return tutors.find(tutor => tutor.id === id);
}

module.exports = {
    Tutor,
    getAllTutors,
    getTutorById
};
