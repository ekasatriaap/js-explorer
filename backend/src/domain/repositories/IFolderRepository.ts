import { Folder } from "../entities/Folder";

export interface IFolderRepository {
  findById(id: string): Promise<Folder | null>;
  getFolderTree(): Promise<any[]>;
  getContents(folderId: string): Promise<{ folders: Folder[]; files: any[] }>;
  search(query: string): Promise<{ folders: Folder[]; files: any[] }>;
}
