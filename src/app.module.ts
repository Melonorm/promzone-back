import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { SubstationModule } from './api/substation/substation.module';
import { EquipmentModule } from './api/equipment/equipment.module';
import { OperatorModule } from './api/operator/operator.module';
import ormconfig from "./configs/ormconfig";
import { OperatorAuthMiddleware } from "./common/middlewares/operator-auth.middleware";

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OperatorAuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    });
  }
}
