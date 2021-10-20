import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubstationEntity } from "./substation.entity";
import { hash } from "bcrypt";

@Entity({name: 'operator'})
export class OperatorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 20, nullable: false, unique: true})
  login: string;

  @Column({type: 'varchar', nullable: false})
  passwordHash: string;

  @Column({type: 'varchar', length: 20, nullable: false})
  lastName: string;

  @Column({type: 'varchar', length: 20, nullable: false})
  firstName: string;

  @Column({type: 'varchar', length: 20, nullable: false})
  fatherName: string;

  @Column({type: 'int', nullable: false})
  substationId: number;


  @ManyToOne(() => SubstationEntity, (substation) => substation.operators)
  substation: SubstationEntity;


  @BeforeInsert()
  async hashingPassword() {
    this.passwordHash = await hash(this.passwordHash, 5);
  }

}