import { Router } from "express";
import { FolderController } from "../controllers/FolderController";
import { FolderService } from "../../application/services/FolderService";
import { FolderRepository } from "../../infrastructure/repositories/FolderRepository";

const router = Router();

// Setup Dependency Injection manually
const folderRepository = new FolderRepository();
const folderService = new FolderService(folderRepository);
const folderController = new FolderController(folderService);

// Routes definition
router.get("/folders/tree", folderController.getFolderTree);
router.get("/folders/:id/contents", folderController.getFolderContents);
router.get("/search", folderController.search);

export default router;
