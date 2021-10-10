import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEquipmentType1633852614859 implements MigrationInterface {
    name = 'CreateEquipmentType1633852614859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`equipment_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`inspectionFrequency\` int NULL, \`description\` text NOT NULL DEFAULT '', UNIQUE INDEX \`IDX_ce2b5e7a7ca480169494f39fad\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`equipmentTypeId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD CONSTRAINT \`FK_94c37b4db0e99d46634f218d9d2\` FOREIGN KEY (\`equipmentTypeId\`) REFERENCES \`equipment_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP FOREIGN KEY \`FK_94c37b4db0e99d46634f218d9d2\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`equipmentTypeId\``);
        await queryRunner.query(`DROP INDEX \`IDX_ce2b5e7a7ca480169494f39fad\` ON \`equipment_type\``);
        await queryRunner.query(`DROP TABLE \`equipment_type\``);
    }

}
