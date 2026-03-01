import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Folder } from "../../domain/entities/Folder";
import { FileModel } from "./FileModel";

@Entity("folders")
export class FolderModel implements Folder {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "uuid", nullable: true })
  parent_id!: string | null;

  @ManyToOne(() => FolderModel, (folder) => folder.children, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parent_id" })
  parent!: FolderModel;

  @OneToMany(() => FolderModel, (folder) => folder.parent)
  children!: FolderModel[];

  @OneToMany(() => FileModel, (file) => file.folder)
  files!: FileModel[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
