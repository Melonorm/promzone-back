import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEquipment1633816856107 implements MigrationInterface {
    name = 'CreateEquipment1633816856107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`equipment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`invNum\` varchar(10) NOT NULL, \`inspectDate\` date NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`lastCheckoutDate\` date NOT NULL, \`nextCheckoutDate\` date NOT NULL, \`isGoodCondition\` tinyint NOT NULL DEFAULT 1, \`inspectedBy\` varchar(30) NOT NULL, \`substationId\` int NOT NULL, \`notation\` text NOT NULL DEFAULT '', UNIQUE INDEX \`IDX_ac59e9808148e8a8534785d5f7\` (\`invNum\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`DROP INDEX \`IDX_ac9b90bf61b6ace752f43c6f4b\` ON \`substation\``);
        await queryRunner.query(`ALTER TABLE \`substation\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`substation\` ADD \`name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`substation\` ADD UNIQUE INDEX \`IDX_ac9b90bf61b6ace752f43c6f4b\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD CONSTRAINT \`FK_4950eaa766b1e1b229dba283290\` FOREIGN KEY (\`substationId\`) REFERENCES \`substation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP FOREIGN KEY \`FK_4950eaa766b1e1b229dba283290\``);
        await queryRunner.query(`ALTER TABLE \`substation\` DROP INDEX \`IDX_ac9b90bf61b6ace752f43c6f4b\``);
        await queryRunner.query(`ALTER TABLE \`substation\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`substation\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ac9b90bf61b6ace752f43c6f4b\` ON \`substation\` (\`name\`)`);
        await queryRunner.query(`DROP INDEX \`IDX_ac59e9808148e8a8534785d5f7\` ON \`equipment\``);
        await queryRunner.query(`DROP TABLE \`equipment\``);
    }

}
