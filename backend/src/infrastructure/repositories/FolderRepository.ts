import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { FolderModel } from "../models/FolderModel";
import { IFolderRepository } from "../../domain/repositories/IFolderRepository";
import { Folder } from "../../domain/entities/Folder";
import { FileModel } from "../models/FileModel";

export class FolderRepository implements IFolderRepository {
  private repo: Repository<FolderModel>;
  private fileRepo: Repository<FileModel>;

  constructor() {
    this.repo = AppDataSource.getRepository(FolderModel);
    this.fileRepo = AppDataSource.getRepository(FileModel);
  }

  async findById(id: string): Promise<Folder | null> {
    return this.repo.findOne({ where: { id } });
  }

  async getFolderTree(): Promise<any[]> {
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
    const rows = await this.repo.query(query);

    // Build nested tree structure from flat rows
    const map = new Map<string, any>();
    const roots: any[] = [];

    for (const row of rows) {
      const node = { ...row, children: [] };
      map.set(row.id, node);
    }

    for (const row of rows) {
      if (row.parent_id === null) {
        roots.push(map.get(row.id));
      } else {
        const parent = map.get(row.parent_id);
        if (parent) {
          parent.children.push(map.get(row.id));
        }
      }
    }

    return roots;
  }

  async getContents(
    folderId: string,
  ): Promise<{ folders: Folder[]; files: any[] }> {
    const folders = await this.repo.find({ where: { parent_id: folderId } });
    const files = await this.fileRepo.find({ where: { folder_id: folderId } });
    return { folders, files };
  }

  async search(query: string): Promise<{ folders: Folder[]; files: any[] }> {
    const folders = await this.repo
      .createQueryBuilder("folder")
      .where("folder.name LIKE :query", { query: `%${query}%` })
      .getMany();

    const files = await this.fileRepo
      .createQueryBuilder("file")
      .where("file.name LIKE :query", { query: `%${query}%` })
      .getMany();

    return { folders, files };
  }
}
