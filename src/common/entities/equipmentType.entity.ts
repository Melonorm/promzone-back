import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('equipment_type')
export class EquipmentTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, unique: true, nullable: false})
  name: string;

  @Column({type: 'int', nullable: true, default: null})
  inspectionFrequency: number;    // периодичность проверок (в месяцах)

  @Column({type: 'text', default: ''})
  description: string;
}
