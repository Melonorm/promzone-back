import {MigrationInterface, QueryRunner} from "typeorm";

export class AllTypesSeeds1633866199704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('INSERT INTO substation (name) VALUES ("Промзона"), ("им. Ягодина")');

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
