import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterEquipment1633872599877 implements MigrationInterface {
    name = 'AlterEquipment1633872599877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` CHANGE \`inspectDate\` \`inspectDate\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment\` CHANGE \`lastCheckoutDate\` \`lastCheckoutDate\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment\` CHANGE \`nextCheckoutDate\` \`nextCheckoutDate\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`equipment\` CHANGE \`nextCheckoutDate\` \`nextCheckoutDate\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment\` CHANGE \`lastCheckoutDate\` \`lastCheckoutDate\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment\` CHANGE \`inspectDate\` \`inspectDate\` date NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`name\` varchar(50) NOT NULL`);
    }

}
