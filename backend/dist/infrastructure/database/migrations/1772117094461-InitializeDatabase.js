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
exports.InitializeDatabase1772117094461 = void 0;
class InitializeDatabase1772117094461 {
    constructor() {
        this.name = 'InitializeDatabase1772117094461';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`files\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`extension\` varchar(10) NOT NULL, \`size\` int NOT NULL, \`folder_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`folders\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`parent_id\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`files\` ADD CONSTRAINT \`FK_27bc84e6954d2fa309a4f61326f\` FOREIGN KEY (\`folder_id\`) REFERENCES \`folders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`folders\` ADD CONSTRAINT \`FK_938a930768697b6ece215667d8e\` FOREIGN KEY (\`parent_id\`) REFERENCES \`folders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`folders\` DROP FOREIGN KEY \`FK_938a930768697b6ece215667d8e\``);
            yield queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_27bc84e6954d2fa309a4f61326f\``);
            yield queryRunner.query(`DROP TABLE \`folders\``);
            yield queryRunner.query(`DROP TABLE \`files\``);
        });
    }
}
exports.InitializeDatabase1772117094461 = InitializeDatabase1772117094461;
