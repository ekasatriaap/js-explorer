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
exports.FolderRepository = void 0;
const data_source_1 = require("../database/data-source");
const FolderModel_1 = require("../models/FolderModel");
const FileModel_1 = require("../models/FileModel");
class FolderRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(FolderModel_1.FolderModel);
        this.fileRepo = data_source_1.AppDataSource.getRepository(FileModel_1.FileModel);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOne({ where: { id } });
        });
    }
    getFolderTree() {
        return __awaiter(this, void 0, void 0, function* () {
            // We use a Recursive CTE query to fetch the entire folder tree.
            // In MariaDB/MySQL 8+, CTE is supported.
            const query = `
      WITH RECURSIVE FolderTree AS (
        SELECT id, name, parent_id, created_at, updated_at, 0 as level, CAST(id AS CHAR(1000)) as path
        FROM folders
        WHERE parent_id IS NULL
        
        UNION ALL
        
        SELECT f.id, f.name, f.parent_id, f.created_at, f.updated_at, ft.level + 1, CONCAT(ft.path, ',', f.id)
        FROM folders f
        INNER JOIN FolderTree ft ON f.parent_id = ft.id
      )
      SELECT * FROM FolderTree ORDER BY path;
    `;
            const rows = yield this.repo.query(query);
            // Build nested tree structure from flat rows
            const map = new Map();
            const roots = [];
            for (const row of rows) {
                const node = Object.assign(Object.assign({}, row), { children: [] });
                map.set(row.id, node);
            }
            for (const row of rows) {
                if (row.parent_id === null) {
                    roots.push(map.get(row.id));
                }
                else {
                    const parent = map.get(row.parent_id);
                    if (parent) {
                        parent.children.push(map.get(row.id));
                    }
                }
            }
            return roots;
        });
    }
    getContents(folderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield this.repo.find({ where: { parent_id: folderId } });
            const files = yield this.fileRepo.find({ where: { folder_id: folderId } });
            return { folders, files };
        });
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield this.repo
                .createQueryBuilder("folder")
                .where("folder.name LIKE :query", { query: `%${query}%` })
                .getMany();
            const files = yield this.fileRepo
                .createQueryBuilder("file")
                .where("file.name LIKE :query", { query: `%${query}%` })
                .getMany();
            return { folders, files };
        });
    }
}
exports.FolderRepository = FolderRepository;
