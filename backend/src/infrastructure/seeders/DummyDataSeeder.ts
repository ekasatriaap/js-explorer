import { AppDataSource } from "../database/data-source";
import { FolderModel } from "../models/FolderModel";
import { FileModel } from "../models/FileModel";

async function seed() {
  await AppDataSource.initialize();
  console.log("Database connected. Starting seeder...");

  const folderRepo = AppDataSource.getRepository(FolderModel);
  const fileRepo = AppDataSource.getRepository(FileModel);

  // Clear existing data safely by clearing tables (Cascading might need careful handling, so clear files first then folders)
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0;");
  await fileRepo.query("TRUNCATE TABLE files;");
  await folderRepo.query("TRUNCATE TABLE folders;");
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1;");
  console.log("Existing data cleared.");

  // Level 1: Root Folders
  const rootFolders: FolderModel[] = [];
  for (let i = 1; i <= 3; i++) {
    const rf = folderRepo.create({ name: `Root Folder ${i}`, parent_id: null });
    rootFolders.push(await folderRepo.save(rf));
  }

  // Next Levels (2 to 5)
  let parentLevelFolders = [...rootFolders];

  for (let level = 2; level <= 5; level++) {
    const currentLevelFolders: FolderModel[] = [];

    for (const parentFolder of parentLevelFolders) {
      // Create 2 children for each parent
      for (let j = 1; j <= 2; j++) {
        const child = folderRepo.create({
          name: `Folder L${level}-${parentFolder.name.substring(parentFolder.name.length - 1)}-${j}`,
          parent_id: parentFolder.id,
        });
        const savedChild = await folderRepo.save(child);
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
        await fileRepo.save([file1, file2]);
      }
    }
    parentLevelFolders = currentLevelFolders;
  }

  console.log("Seeding completed successfully.");
  await AppDataSource.destroy();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error during seeding:", err);
    process.exit(1);
  });
