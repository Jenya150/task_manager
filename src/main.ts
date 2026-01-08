import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DomainExceptionFilterForUsers } from './users/domain/domainExceptionFilter';
import { DomainExceptionFilterForBoards } from './boards/domain/domainExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new DomainExceptionFilterForUsers());
  app.useGlobalFilters(new DomainExceptionFilterForBoards());

  await app.listen(3000);
}
bootstrap();
