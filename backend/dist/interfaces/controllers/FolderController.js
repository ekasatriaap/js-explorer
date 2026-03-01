"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderController = void 0;
class FolderController {
    constructor(folderService) {
        this.folderService = folderService;
        this.getFolderTree = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tree = yield this.folderService.getFolderTree();
                res.json({ success: true, data: tree });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
        this.getFolderContents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const contents = yield this.folderService.getFolderContents(id);
                res.json({ success: true, data: contents });
            }
            catch (error) {
                if (error.message === "Folder not found") {
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    res.status(500).json({ success: false, message: error.message });
                }
            }
        });
        this.search = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.q;
                const results = yield this.folderService.search(query);
                res.json({ success: true, data: results });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
    }
}
exports.FolderController = FolderController;
