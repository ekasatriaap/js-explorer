import { FolderService } from "../FolderService";
import { IFolderRepository } from "../../../domain/repositories/IFolderRepository";
import { Folder } from "../../../domain/entities/Folder";

describe("FolderService", () => {
  let mockFolderRepository: jest.Mocked<IFolderRepository>;
  let folderService: FolderService;

  beforeEach(() => {
    mockFolderRepository = {
      findById: jest.fn(),
      getFolderTree: jest.fn(),
      getContents: jest.fn(),
      search: jest.fn(),
    };
    folderService = new FolderService(mockFolderRepository);
  });

  describe("getFolderTree", () => {
    it("should return the folder tree from repository", async () => {
      const mockTree = [{ id: "root-1", name: "Root 1", children: [] }];
      mockFolderRepository.getFolderTree.mockResolvedValue(mockTree);

      const result = await folderService.getFolderTree();

      expect(mockFolderRepository.getFolderTree).toHaveBeenCalled();
      expect(result).toEqual(mockTree);
    });
  });

  describe("getFolderContents", () => {
    it("should throw an error if no ID is provided", async () => {
      await expect(folderService.getFolderContents("")).rejects.toThrow(
        "Folder ID is required",
      );
    });

    it("should throw an error if folder is not found", async () => {
      mockFolderRepository.findById.mockResolvedValue(null);
      await expect(
        folderService.getFolderContents("invalid-id"),
      ).rejects.toThrow("Folder not found");
    });

    it("should return contents if folder exists", async () => {
      const mockFolder: Folder = {
        id: "folder-1",
        name: "Test Folder",
        parent_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const mockContents = { folders: [mockFolder], files: [] };
      mockFolderRepository.findById.mockResolvedValue(mockFolder);
      mockFolderRepository.getContents.mockResolvedValue(mockContents);

      const result = await folderService.getFolderContents("folder-1");

      expect(mockFolderRepository.findById).toHaveBeenCalledWith("folder-1");
      expect(mockFolderRepository.getContents).toHaveBeenCalledWith("folder-1");
      expect(result).toEqual(mockContents);
    });
  });

  describe("search", () => {
    it("should return empty arrays if query is empty", async () => {
      const result = await folderService.search("");
      expect(result).toEqual({ folders: [], files: [] });
      expect(mockFolderRepository.search).not.toHaveBeenCalled();
    });

    it("should return search results", async () => {
      const mockResults = {
        folders: [
          {
            id: "1",
            name: "test fol",
            parent_id: null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        files: [],
      };
      mockFolderRepository.search.mockResolvedValue(mockResults);

      const result = await folderService.search("test");

      expect(mockFolderRepository.search).toHaveBeenCalledWith("test");
      expect(result).toEqual(mockResults);
    });
  });
});
