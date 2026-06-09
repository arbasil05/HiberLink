export function validateSignUp(req, res, next) {
    try {

        if (!req.body) {
            const error = new Error("No body found in the request");
            error.statusCode = 400;
            throw error;
        }

        const { username, password } = req.body;

        if (!username || !password) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            throw error;
        }

        next();

    } catch (error) {
        next(error);
    }
}