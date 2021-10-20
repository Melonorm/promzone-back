import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { SubstationModule } from './api/substation/substation.module';
import { EquipmentModule } from './api/equipment/equipment.module';
import { OperatorModule } from './api/operator/operator.module';
import ormconfig from "./configs/ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SubstationModule,
    EquipmentModule,
    OperatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
