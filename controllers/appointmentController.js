const appointmentService = require("../services/appointmentService");
const studentService = require("../services/studentService");

// Display all appointments
function getAppointments(req, res) {
    try {
        const appointments = appointmentService.getAllAppointments();
        const tutors = require("../services/tutorService").getAllTutors();

        res.render("appointments", {
            appointments: appointments,
            tutors: tutors
        });
    } catch (error) {
        console.error("Appointment loading error:", error);
        res.status(500).send("Unable to load appointments.");
    }
}

// Create a new appointment
function bookAppointment(req, res) {
    try {
        const { studentEmail, tutor, subject, date, time } = req.body;

        if (!studentEmail || !tutor || !subject || !date || !time) {
            return res.status(400).send("Please complete all appointment fields.");
        }

        const student = studentService.getAllStudents().find(
            student => student.email.toLowerCase() === studentEmail.trim().toLowerCase()
        );

        if (!student) {
            return res.status(404).render("register-required");
        }

        const appointment = appointmentService.bookAppointment(
            student.email,
            tutor,
            subject,
            date,
            time
        );

    if (!appointment) {
    return res.status(400).render("appointment-error");
}
        res.redirect("/appointments?success=true");

    } catch (error) {
        console.error("Appointment booking error:", error);
        res.status(500).send("Unable to book appointment.");
    }
}

// Cancel an appointment
function cancelAppointment(req, res) {
    try {
        const appointment = appointmentService.cancelAppointment(req.body.id);

        if (!appointment) {
            return res.status(404).send("Appointment not found.");
        }

        res.redirect("/appointments");
    } catch (error) {
        console.error("Appointment cancellation error:", error);
        res.status(500).send("Unable to cancel appointment.");
    }
}

module.exports = {
    getAppointments,
    bookAppointment,
    cancelAppointment
};
