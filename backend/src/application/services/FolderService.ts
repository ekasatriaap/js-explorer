import { IFolderRepository } from "../../domain/repositories/IFolderRepository";

export class FolderService {
  constructor(private folderRepository: IFolderRepository) {}

  async getFolderTree() {
    return this.folderRepository.getFolderTree();
  }

  async getFolderContents(id: string) {
    if (!id) {
      throw new Error("Folder ID is required");
    }
    const folder = await this.folderRepository.findById(id);
    if (!folder) {
      throw new Error("Folder not found");
    }
    return this.folderRepository.getContents(id);
  }

  async search(query: string) {
    if (!query) {
      return { folders: [], files: [] };
    }
    return this.folderRepository.search(query);
  }
}
