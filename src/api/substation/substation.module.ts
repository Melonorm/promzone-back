import { Module } from '@nestjs/common';
import { SubstationController } from './substation.controller';
import { SubstationService } from './substation.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubstationRepository } from "../../common/repositories/substation.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SubstationRepository])],
  controllers: [SubstationController],
  providers: [SubstationService]
})
export class SubstationModule {}
