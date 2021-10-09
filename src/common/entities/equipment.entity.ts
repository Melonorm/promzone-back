import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubstationEntity } from "./substation.entity";

@Entity({name: 'equipment'})
export class EquipmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, nullable: false})
  name: string;        // TODO: В дальнейшем реализовать через отдельную таблицу "тип защитного средства"

  @Column({type: 'varchar', length: 10, unique: true, nullable: false})
  invNum: string;   // инвентарный номер

  @Column({type: 'date', nullable: false, default: () => 'CURRENT_TIMESTAMP'})  // TODO: Переделать
  inspectDate: Date;  // дата проверки

  @Column({type: 'date', nullable: false})  // TODO: Переделать
  lastCheckoutDate: Date; // дата последнего испытания

  @Column({type: 'date', nullable: false})  // TODO: Переделать
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
}