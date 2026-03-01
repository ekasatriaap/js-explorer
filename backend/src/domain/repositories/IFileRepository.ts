import { File } from "../entities/File";

export interface IFileRepository {
  findById(id: string): Promise<File | null>;
  searchByName(query: string): Promise<File[]>;
}
