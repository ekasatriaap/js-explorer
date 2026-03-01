import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { FileModel } from "../models/FileModel";
import { IFileRepository } from "../../domain/repositories/IFileRepository";
import { File } from "../../domain/entities/File";

export class FileRepository implements IFileRepository {
  private repo: Repository<FileModel>;

  constructor() {
    this.repo = AppDataSource.getRepository(FileModel);
  }

  async findById(id: string): Promise<File | null> {
    return this.repo.findOne({ where: { id } });
  }

  async searchByName(query: string): Promise<File[]> {
    return this.repo
      .createQueryBuilder("file")
      .where("file.name LIKE :query", { query: `%${query}%` })
      .getMany();
  }
}
