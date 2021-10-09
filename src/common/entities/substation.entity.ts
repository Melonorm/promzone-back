import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'substation'})
export class SubstationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'name', type: 'varchar', unique: true})
  name: string;
}