import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {

    const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

    try {
        const token = req.cookies.jwt;

        if (!token) {
            const error = new Error("No token provided");
            error.statusCode = 401;
            throw error;
        }

        jwt.verify(token, SECRET_JWT_KEY, (error, decoded) => {
            if (error) {
                return next(error);
            }
            const id = decoded.id;
            req.id = id;
            next();
        })
    } catch (error) {
        next(error);
    }
}

export default authMiddleware;