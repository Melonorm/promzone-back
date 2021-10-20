import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EquipmentEntity } from "./equipment.entity";
import { OperatorEntity } from "./operator.entity";

@Entity({name: 'substation'})
export class SubstationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'name', type: 'varchar', length: 50, unique: true})
  name: string;

  @OneToMany(() => OperatorEntity, (operator) => operator.substation)
  operators: OperatorEntity[];
}