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
exports.FolderService = void 0;
class FolderService {
    constructor(folderRepository) {
        this.folderRepository = folderRepository;
    }
    getFolderTree() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.folderRepository.getFolderTree();
        });
    }
    getFolderContents(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("Folder ID is required");
            }
            const folder = yield this.folderRepository.findById(id);
            if (!folder) {
                throw new Error("Folder not found");
            }
            return this.folderRepository.getContents(id);
        });
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query) {
                return { folders: [], files: [] };
            }
            return this.folderRepository.search(query);
        });
    }
}
exports.FolderService = FolderService;
