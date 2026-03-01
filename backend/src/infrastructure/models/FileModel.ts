import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { File } from "../../domain/entities/File";
import { FolderModel } from "./FolderModel";

@Entity("files")
export class FileModel implements File {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 10 })
  extension!: string;

  @Column({ type: "int" })
  size!: number;

  @Column({ type: "uuid" })
  folder_id!: string;

  @ManyToOne(() => FolderModel, (folder) => folder.files, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "folder_id" })
  folder!: FolderModel;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
