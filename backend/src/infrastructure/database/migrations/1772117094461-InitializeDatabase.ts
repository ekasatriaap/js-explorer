import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeDatabase1772117094461 implements MigrationInterface {
    name = 'InitializeDatabase1772117094461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`files\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`extension\` varchar(10) NOT NULL, \`size\` int NOT NULL, \`folder_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`folders\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`parent_id\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_27bc84e6954d2fa309a4f61326f\` FOREIGN KEY (\`folder_id\`) REFERENCES \`folders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`folders\` ADD CONSTRAINT \`FK_938a930768697b6ece215667d8e\` FOREIGN KEY (\`parent_id\`) REFERENCES \`folders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`folders\` DROP FOREIGN KEY \`FK_938a930768697b6ece215667d8e\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_27bc84e6954d2fa309a4f61326f\``);
        await queryRunner.query(`DROP TABLE \`folders\``);
        await queryRunner.query(`DROP TABLE \`files\``);
    }

}
