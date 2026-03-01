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
exports.FileRepository = void 0;
const data_source_1 = require("../database/data-source");
const FileModel_1 = require("../models/FileModel");
class FileRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(FileModel_1.FileModel);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOne({ where: { id } });
        });
    }
    searchByName(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo
                .createQueryBuilder("file")
                .where("file.name LIKE :query", { query: `%${query}%` })
                .getMany();
        });
    }
}
exports.FileRepository = FileRepository;
