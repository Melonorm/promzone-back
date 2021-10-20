import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOperator1634760216706 implements MigrationInterface {
    name = 'CreateOperator1634760216706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`operator\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` varchar(20) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`lastName\` varchar(20) NOT NULL, \`firstName\` varchar(20) NOT NULL, \`fatherName\` varchar(20) NOT NULL, \`substationId\` int NOT NULL, UNIQUE INDEX \`IDX_eb30063f81e1823fa59934c0ee\` (\`login\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`operator\` ADD CONSTRAINT \`FK_43a1bf4cf242a22d7cbd4fe1148\` FOREIGN KEY (\`substationId\`) REFERENCES \`substation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`operator\` DROP FOREIGN KEY \`FK_43a1bf4cf242a22d7cbd4fe1148\``);
        await queryRunner.query(`DROP INDEX \`IDX_eb30063f81e1823fa59934c0ee\` ON \`operator\``);
        await queryRunner.query(`DROP TABLE \`operator\``);
    }

}
