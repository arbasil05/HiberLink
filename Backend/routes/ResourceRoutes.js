import { Router } from "express";
import { createResource, deleteResource, getResources } from "../controller/ResourceController.js";
import { validateResource } from "../middleware/validateResource.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/resources", authMiddleware, getResources);
router.post("/resources", authMiddleware, validateResource, createResource);
router.delete("/resources/:id", authMiddleware, deleteResource);

export default router;