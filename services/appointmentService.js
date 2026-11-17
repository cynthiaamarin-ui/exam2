
// Appointment service

class Appointment {
    constructor(studentEmail, tutor, subject, date, time) {
        this.id = Date.now().toString();
        this.studentEmail = studentEmail;
        this.tutor = tutor;
        this.subject = subject;
        this.date = date;
        this.time = time;
        this.status = "Scheduled";
    }
}

// Temporary in-memory appointment collection
const appointments = [];

// Create a new appointment
function bookAppointment(studentEmail, tutor, subject, date, time) {
    const appointment = new Appointment(
        studentEmail,
        tutor,
        subject,
        date,
        time
    );

    appointments.push(appointment);

    return appointment;
}

// Retrieve all appointments
function getAllAppointments() {
    return appointments;
}

// Cancel an appointment
function cancelAppointment(id) {
    const appointment = appointments.find(
        appointment => appointment.id === id
    );

    if (!appointment) {
        return null;
    }

    appointment.status = "Cancelled";

    return appointment;
}

module.exports = {
    Appointment,
    bookAppointment,
    getAllAppointments,
    cancelAppointment
};
