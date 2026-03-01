import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { FolderModel } from "../models/FolderModel";
import { FileModel } from "../models/FileModel";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "js_explorer",
  synchronize: true,
  logging: false,
  entities: [FolderModel, FileModel],
  migrations: ["src/infrastructure/database/migrations/**/*.ts"],
  subscribers: [],
});
