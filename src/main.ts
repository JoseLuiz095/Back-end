import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  app.enableCors();
  await app.listen(3000);
  console.log('Aplicação rodando na porta 3000');
}

bootstrap();
