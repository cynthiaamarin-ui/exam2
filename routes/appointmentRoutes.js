const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

// Display appointments
router.get("/appointments", appointmentController.getAppointments);

// Book an appointment
router.post("/appointments", appointmentController.bookAppointment);

// Cancel an appointment
router.post("/appointments/cancel", appointmentController.cancelAppointment);

module.exports = router;
