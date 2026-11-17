const tutorService = require("./tutorService");

// Appointment service

class Appointment {
    constructor(studentEmail, tutor, subject, date, time) {
        this.id = Date.now().toString() + Math.random().toString(36).slice(2, 7);
        this.studentEmail = studentEmail;
        this.tutor = tutor;
        this.subject = subject;
        this.date = date;
        this.time = time;
        this.durationMinutes = 60;
        this.status = "Scheduled";
    }
}

// Temporary in-memory appointment collection
const appointments = [];

// Validate the selected date
function isValidWeekday(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }

    const selectedDate = new Date(`${date}T12:00:00`);

    if (Number.isNaN(selectedDate.getTime())) {
        return false;
    }

    // Make sure the date is a real calendar date
    if (selectedDate.toISOString().slice(0, 10) !== date) {
        return false;
    }

    const day = selectedDate.getDay();

    return day >= 1 && day <= 5;
}

// Validate the selected time
function isValidTime(time) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
        return false;
    }

    const [hours, minutes] = time.split(":").map(Number);

    // Sessions must start on the hour, between 8 AM and 4 PM
    return minutes === 0 && hours >= 8 && hours <= 16;
}

// Create a new appointment
function bookAppointment(studentEmail, tutor, subject, date, time) {

    if (!isValidWeekday(date)) {
        return {
            success: false,
            message: "Tutoring appointments are only available Monday through Friday."
        };
    }

    if (!isValidTime(time)) {
        return {
            success: false,
            message: "Please select an available start time between 8 AM and 4 PM."
        };
    }

    const selectedTutor = tutorService.getAllTutors().find(
        item => item.name === tutor
    );

    if (!selectedTutor || !selectedTutor.subjects.includes(subject)) {
        return {
            success: false,
            message: "This tutor is not available for the selected subject."
        };
    }

    // Check for overlapping scheduled appointments
    const requestedStart = Number(time.split(":")[0]) * 60;
    const requestedEnd = requestedStart + 60;

    const conflict = appointments.find(appointment => {
        if (
            appointment.tutor !== tutor ||
            appointment.date !== date ||
            appointment.status === "Cancelled"
        ) {
            return false;
        }

        const existingStart = Number(appointment.time.split(":")[0]) * 60;
        const existingEnd = existingStart + appointment.durationMinutes;

        return requestedStart < existingEnd && requestedEnd > existingStart;
    });

    if (conflict) {
        return {
            success: false,
            message: "Sorry, this tutor is already booked at that time. Please choose another time."
        };
    }

    const appointment = new Appointment(
        studentEmail,
        tutor,
        subject,
        date,
        time
    );

    appointments.push(appointment);

    return {
        success: true,
        appointment: appointment
    };
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