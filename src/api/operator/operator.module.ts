import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OperatorRepository } from "../../common/repositories/operator.repository";

@Module({
  imports: [TypeOrmModule.forFeature([OperatorRepository])],
  providers: [OperatorService],
  controllers: [OperatorController]
})
export class OperatorModule {}
