const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the stack trace for debugging
    res.status(500).send({ error: 'Something went wrong!' });
};

module.exports = errorHandler;
