function notFoundMiddleware(req, res, next) {
    res.status(404).send("Sorry, the page you are looking for was not found.");
}

module.exports = notFoundMiddleware;
