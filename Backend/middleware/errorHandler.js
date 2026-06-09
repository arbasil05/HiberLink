export function handleErrors(error, req, res, next) {
    console.log(`Error handler called, Error : ${error.stack}`)

    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error";
    const errorName = error.name;

    if (errorName === "ValidationError") {
        statusCode = 400;
        message = "Validation Failed"
    }

    if (errorName === "MongoServerError" && error.code === 11000) {
        statusCode = 409;
        message = "Resource already exist"
    }

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        error: {
            message: message
        }

    });
}