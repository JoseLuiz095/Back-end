import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [AppController], // <-- Registra o controlador
  providers: [] // <-- Importante manter vazio se não houver providers
})
export class AppModule {}