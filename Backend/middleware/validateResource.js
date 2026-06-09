export function validateResource(req, res, next) {

    try {

        const { title, url, category, description } = req.body;

        if (!title, !url, !category) {
            const error = new Error("All fields are required");
            error.statusCode = 400
            throw error;
        }

        next();


    } catch (error) {
        next(error);
    }


}