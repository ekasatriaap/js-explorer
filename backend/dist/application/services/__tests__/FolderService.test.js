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
const FolderService_1 = require("../FolderService");
describe("FolderService", () => {
    let mockFolderRepository;
    let folderService;
    beforeEach(() => {
        mockFolderRepository = {
            findById: jest.fn(),
            getFolderTree: jest.fn(),
            getContents: jest.fn(),
            search: jest.fn(),
        };
        folderService = new FolderService_1.FolderService(mockFolderRepository);
    });
    describe("getFolderTree", () => {
        it("should return the folder tree from repository", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTree = [{ id: "root-1", name: "Root 1", children: [] }];
            mockFolderRepository.getFolderTree.mockResolvedValue(mockTree);
            const result = yield folderService.getFolderTree();
            expect(mockFolderRepository.getFolderTree).toHaveBeenCalled();
            expect(result).toEqual(mockTree);
        }));
    });
    describe("getFolderContents", () => {
        it("should throw an error if no ID is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(folderService.getFolderContents("")).rejects.toThrow("Folder ID is required");
        }));
        it("should throw an error if folder is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            mockFolderRepository.findById.mockResolvedValue(null);
            yield expect(folderService.getFolderContents("invalid-id")).rejects.toThrow("Folder not found");
        }));
        it("should return contents if folder exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockFolder = {
                id: "folder-1",
                name: "Test Folder",
                parent_id: null,
                created_at: new Date(),
                updated_at: new Date(),
            };
            const mockContents = { folders: [mockFolder], files: [] };
            mockFolderRepository.findById.mockResolvedValue(mockFolder);
            mockFolderRepository.getContents.mockResolvedValue(mockContents);
            const result = yield folderService.getFolderContents("folder-1");
            expect(mockFolderRepository.findById).toHaveBeenCalledWith("folder-1");
            expect(mockFolderRepository.getContents).toHaveBeenCalledWith("folder-1");
            expect(result).toEqual(mockContents);
        }));
    });
    describe("search", () => {
        it("should return empty arrays if query is empty", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield folderService.search("");
            expect(result).toEqual({ folders: [], files: [] });
            expect(mockFolderRepository.search).not.toHaveBeenCalled();
        }));
        it("should return search results", () => __awaiter(void 0, void 0, void 0, function* () {
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
            const result = yield folderService.search("test");
            expect(mockFolderRepository.search).toHaveBeenCalledWith("test");
            expect(result).toEqual(mockResults);
        }));
    });
});
