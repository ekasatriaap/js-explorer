"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FolderController_1 = require("../controllers/FolderController");
const FolderService_1 = require("../../application/services/FolderService");
const FolderRepository_1 = require("../../infrastructure/repositories/FolderRepository");
const router = (0, express_1.Router)();
// Setup Dependency Injection manually
const folderRepository = new FolderRepository_1.FolderRepository();
const folderService = new FolderService_1.FolderService(folderRepository);
const folderController = new FolderController_1.FolderController(folderService);
// Routes definition
router.get("/folders/tree", folderController.getFolderTree);
router.get("/folders/:id/contents", folderController.getFolderContents);
router.get("/search", folderController.search);
exports.default = router;
