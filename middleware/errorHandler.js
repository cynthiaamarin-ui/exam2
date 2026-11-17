function errorHandler(err, req, res, next) {
    console.error("Application Error:", err.message);

    res.status(err.status || 500).send(
        "Something went wrong. Please try again later."
    );
}

module.exports = errorHandler;
