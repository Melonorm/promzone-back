import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSubstation1633792034203 implements MigrationInterface {
    name = 'CreateSubstation1633792034203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`substation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ac9b90bf61b6ace752f43c6f4b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ac9b90bf61b6ace752f43c6f4b\` ON \`substation\``);
        await queryRunner.query(`DROP TABLE \`substation\``);
    }

}
