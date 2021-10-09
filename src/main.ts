import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;

  const app = await NestFactory.create(AppModule);
  await app.listen(
    PORT,
    () => console.log(`Server started at ${PORT} port`));
}
bootstrap();

/*
      1. yarn add typeorm
         yarn add @nestjs/typeorm
         yarn add mysql2
         yarn add @nestjs/ormconfig

         .env
         .env.example
         ormconfig.ts
         ormseedconfig.ts
         import typeorm, ormconfig in app.module
         added orm scripts in package.json
 */
