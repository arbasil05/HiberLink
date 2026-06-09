import Resource from "../models/Resource.js";

export async function getResources(req, res, next) {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const search = req.query.search;
        const sort = req.query.sort;
        const allowedSorting = ["latest", "oldest", "title"];

        const skip = (page - 1) * limit;

        const query = {};
        const sortQuery = { createdAt: -1 };

        if (category) {
            query.category = category;
        }

        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            }
        }

        if (sort && allowedSorting.includes(sort)) {
            if (sort === "oldest") {
                sortQuery.createdAt = 1;
            } else if (sort === "title") {
                sortQuery.title = 1;
            }
        }

        query.owner = req.id;

        const total = await Resource.countDocuments(query);

        const resources = await Resource.find(query)
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(total / limit);

        return res.status(200).json({
            page,
            limit,
            total,
            totalPages,
            resources
        });

    } catch (error) {
        next(error);
    }
}

export async function createResource(req, res, next) {

    try {
        const { title, url, category, description } = req.body;
        const resource = new Resource({ title, url, category, description, owner: req.id })
        const savedResource = await resource.save();
        return res.status(201).json({ message: "Added successfully", savedResource: savedResource });

    } catch (error) {
        next(error);
    }

}

export async function deleteResource(req, res, next) {

    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            const error = new Error("Resource not found");
            error.statusCode = 404;
            throw error;
        }

        if (resource.owner.toString() !== req.id) {
            const error = new Error("Unauthorized operation");
            error.statusCode = 403;
            throw error;
        }

        await Resource.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Resource deleted successfully" });

    } catch (error) {
        next(error);

    }

}