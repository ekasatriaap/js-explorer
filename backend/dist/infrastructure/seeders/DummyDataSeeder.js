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
const data_source_1 = require("../database/data-source");
const FolderModel_1 = require("../models/FolderModel");
const FileModel_1 = require("../models/FileModel");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize();
        console.log("Database connected. Starting seeder...");
        const folderRepo = data_source_1.AppDataSource.getRepository(FolderModel_1.FolderModel);
        const fileRepo = data_source_1.AppDataSource.getRepository(FileModel_1.FileModel);
        // Clear existing data safely by clearing tables (Cascading might need careful handling, so clear files first then folders)
        yield data_source_1.AppDataSource.query("SET FOREIGN_KEY_CHECKS=0;");
        yield fileRepo.query("TRUNCATE TABLE files;");
        yield folderRepo.query("TRUNCATE TABLE folders;");
        yield data_source_1.AppDataSource.query("SET FOREIGN_KEY_CHECKS=1;");
        console.log("Existing data cleared.");
        // Level 1: Root Folders
        const rootFolders = [];
        for (let i = 1; i <= 3; i++) {
            const rf = folderRepo.create({ name: `Root Folder ${i}`, parent_id: null });
            rootFolders.push(yield folderRepo.save(rf));
        }
        // Next Levels (2 to 5)
        let parentLevelFolders = [...rootFolders];
        for (let level = 2; level <= 5; level++) {
            const currentLevelFolders = [];
            for (const parentFolder of parentLevelFolders) {
                // Create 2 children for each parent
                for (let j = 1; j <= 2; j++) {
                    const child = folderRepo.create({
                        name: `Folder L${level}-${parentFolder.name.substring(parentFolder.name.length - 1)}-${j}`,
                        parent_id: parentFolder.id,
                    });
                    const savedChild = yield folderRepo.save(child);
                    currentLevelFolders.push(savedChild);
                    // Also insert some files
                    const file1 = fileRepo.create({
                        name: `File_A_L${level}`,
                        extension: "txt",
                        size: Math.floor(Math.random() * 1024 * 1024),
                        folder_id: savedChild.id,
                    });
                    const file2 = fileRepo.create({
                        name: `Image_B_L${level}`,
                        extension: "jpg",
                        size: Math.floor(Math.random() * 1024 * 1024 * 5),
                        folder_id: savedChild.id,
                    });
                    yield fileRepo.save([file1, file2]);
                }
            }
            parentLevelFolders = currentLevelFolders;
        }
        console.log("Seeding completed successfully.");
        yield data_source_1.AppDataSource.destroy();
    });
}
seed()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error("Error during seeding:", err);
    process.exit(1);
});
