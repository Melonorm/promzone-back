import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'substation'})
export class SubstationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'name', type: 'varchar', length: 50, unique: true})
  name: string;
}