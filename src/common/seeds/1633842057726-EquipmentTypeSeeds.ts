import {MigrationInterface, QueryRunner} from "typeorm";

export class EquipmentTypeSeeds1633842057726 implements MigrationInterface {
    name = 'EquipmentTypeSeeds1633842057726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('INSERT INTO equipment_type (name, inspectionFrequency) VALUES ("Перчатки диэлектрические", 6), ("Штанга оперативная 35кВ", null);');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
