import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubstationEntity } from "./substation.entity";
import { EquipmentTypeEntity } from "./equipmentType.entity";

@Entity({name: 'equipment'})
export class EquipmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 10, unique: true, nullable: false})
  invNum: string;   // инвентарный номер

  @Column({type: 'int', nullable: false})
  equipmentTypeId: number;

  @Column({type: 'date', nullable: false})
  inspectDate: Date;  // дата проверки

  @Column({type: 'date', nullable: true})      // формат в БД: ГГГГ-ММ-ДД  Пример: 2022-04-10
  lastCheckoutDate: Date; // дата последнего испытания

  @Column({type: 'date', nullable: true})
  nextCheckoutDate: Date;  // дата следующего испытания

  @Column({type: 'boolean', nullable: false, default: true})
  isGoodCondition: boolean;   // рабочее состояние

  @Column({type: 'varchar', length: 30, nullable: false})
  inspectedBy: string;    // ФИО проверяющего

  @Column()
  substationId: number;

  @Column({type: 'text', default: ''})
  notation: string;      // заметки

  @ManyToOne(() => SubstationEntity)
  substation: SubstationEntity;

  @ManyToOne(() => EquipmentTypeEntity)
  equipmentType: EquipmentTypeEntity;
}