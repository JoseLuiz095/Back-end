"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const tasks_module_1 = require("./tasks/tasks.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(tasks_module_1.TasksModule);
    app.enableCors();
    await app.listen(3000);
    console.log('Aplicação rodando na porta 3000');
}
bootstrap();
//# sourceMappingURL=main.js.map