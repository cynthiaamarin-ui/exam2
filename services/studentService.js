
// Student service

class Student {
    constructor(name, email, major, subject) {
        this.id = Date.now().toString();
        this.name = name;
        this.email = email;
        this.major = major;
        this.subject = subject;
    }
}

// Temporary in-memory student collection
const students = [];

function registerStudent(name, email, major, subject) {

    // Check whether the email is already registered
    const existingStudent = students.find(
        student => student.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existingStudent) {
        return null;
    }

    // Create a new student if the email is available
    const student = new Student(name, email.trim(), major, subject);

    students.push(student);

    return student;
}

function getAllStudents() {
    return students;
}

module.exports = {
    Student,
    registerStudent,
    getAllStudents
};
