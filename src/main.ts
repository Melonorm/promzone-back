import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const PORT = process.env.PORT || 3350;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
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

      2. Substation: module, entity, repository etc,
         yarn add class-transformer
         yarn add class-validator

      3. yarn add date-fns
         Equipment: module, entity, repository etc.
 */
