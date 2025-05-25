import { Controller, Get } from '@nestjs/common';

@Controller() // <-- Sem rota prefixada
export class AppController {
  @Get()
  getRoot() {
    return {
      message: "API de Tarefas - Funcionando!",
      endpoints: {
        tasks: "/tasks",
        docs: "/api"
      }
    };
  }
}