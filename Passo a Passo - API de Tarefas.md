# Passo a Passo - API de Tarefas

## Estrutura do Projeto

```
task_api/
├── src/
│   ├── tasks/
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.module.ts
│   └── main.ts
├── frontend/
│   └── index.html
├── package.json
└── tsconfig.json
```

## Configuração Inicial

1. Criar diretório do projeto:
```
mkdir task_api
cd task_api
```

2. Inicializar projeto:
```
npm init -y
```

3. Configurar package.json:
```json
{
  "name": "task-api",
  "version": "1.0.0",
  "description": "API para gerenciamento de tarefas",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "ts-node src/main.ts"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@types/node": "^20.3.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.1.3"
  }
}
```

4. Instalar dependências:
```
npm install
```

5. Criar estrutura de diretórios:
```
mkdir -p src/tasks frontend
```

6. Configurar TypeScript (tsconfig.json):
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

## Implementação da API

1. Controller (src/tasks/tasks.controller.ts):
```typescript
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(+id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.tasksService.remove(+id);
  }
}
```

2. Service (src/tasks/tasks.service.ts):
```typescript
import { Injectable } from '@nestjs/common';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Estudar NestJS',
      description: 'Aprender sobre controllers, services e modules',
      completed: false,
    },
    {
      id: 2,
      title: 'Criar API REST',
      description: 'Implementar endpoints CRUD para tarefas',
      completed: true,
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new Error(`Tarefa com ID ${id} não encontrada`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1,
      ...createTaskDto,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error(`Tarefa com ID ${id} não encontrada`);
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updateTaskDto,
    };

    return this.tasks[taskIndex];
  }

  remove(id: number): void {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error(`Tarefa com ID ${id} não encontrada`);
    }
    this.tasks.splice(taskIndex, 1);
  }
}
```

3. Module (src/tasks/tasks.module.ts):
```typescript
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
```

4. Main (src/main.ts):
```typescript
import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  app.enableCors();
  await app.listen(3000);
  console.log('Aplicação rodando na porta 3000');
}

bootstrap();
```

## Frontend

Criar arquivo frontend/index.html:
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciador de Tarefas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .task-form {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 10px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        .task-list {
            list-style: none;
            padding: 0;
        }
        .task-item {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .task-content {
            flex-grow: 1;
        }
        .task-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .task-description {
            color: #666;
        }
        .task-status {
            font-size: 0.8em;
            padding: 3px 6px;
            border-radius: 3px;
            margin-left: 10px;
        }
        .status-pending {
            background-color: #ffcc00;
        }
        .status-completed {
            background-color: #4CAF50;
            color: white;
        }
        .task-actions {
            display: flex;
            gap: 5px;
        }
        .btn-delete {
            background-color: #f44336;
        }
        .btn-complete {
            background-color: #2196F3;
        }
        .error-message {
            color: red;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1>Gerenciador de Tarefas</h1>
    
    <div class="task-form">
        <h2>Nova Tarefa</h2>
        <div class="form-group">
            <label for="title">Título:</label>
            <input type="text" id="title" required>
        </div>
        <div class="form-group">
            <label for="description">Descrição:</label>
            <textarea id="description" rows="3"></textarea>
        </div>
        <button onclick="createTask()">Adicionar Tarefa</button>
        <div id="form-error" class="error-message"></div>
    </div>
    
    <h2>Minhas Tarefas</h2>
    <ul id="task-list" class="task-list">
    </ul>
    <div id="list-error" class="error-message"></div>

    <script>
        const API_URL = 'http://localhost:3000/tasks';
        
        async function loadTasks() {
            try {
                const response = await fetch(API_URL);
                const tasks = await response.json();
                
                const taskList = document.getElementById('task-list');
                taskList.innerHTML = '';
                
                tasks.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.className = 'task-item';
                    taskItem.innerHTML = `
                        <div class="task-content">
                            <div class="task-title">${task.title}
                                <span class="task-status ${task.completed ? 'status-completed' : 'status-pending'}">
                                    ${task.completed ? 'Concluída' : 'Pendente'}
                                </span>
                            </div>
                            <div class="task-description">${task.description}</div>
                        </div>
                        <div class="task-actions">
                            ${!task.completed ? 
                                `<button class="btn-complete" onclick="completeTask(${task.id})">Concluir</button>` : ''}
                            <button class="btn-delete" onclick="deleteTask(${task.id})">Excluir</button>
                        </div>
                    `;
                    taskList.appendChild(taskItem);
                });
                
                document.getElementById('list-error').textContent = '';
            } catch (error) {
                document.getElementById('list-error').textContent = 'Erro ao carregar tarefas: ' + error.message;
            }
        }
        
        async function createTask() {
            const title = document.getElementById('title').value.trim();
            const description = document.getElementById('description').value.trim();
            
            if (!title) {
                document.getElementById('form-error').textContent = 'O título é obrigatório';
                return;
            }
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, description }),
                });
                
                if (!response.ok) {
                    throw new Error('Erro ao criar tarefa');
                }
                
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                document.getElementById('form-error').textContent = '';
                
                loadTasks();
            } catch (error) {
                document.getElementById('form-error').textContent = 'Erro ao criar tarefa: ' + error.message;
            }
        }
        
        async function completeTask(id) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ completed: true }),
                });
                
                if (!response.ok) {
                    throw new Error('Erro ao atualizar tarefa');
                }
                
                loadTasks();
            } catch (error) {
                document.getElementById('list-error').textContent = 'Erro ao atualizar tarefa: ' + error.message;
            }
        }
        
        async function deleteTask(id) {
            if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
                return;
            }
            
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });
                
                if (!response.ok) {
                    throw new Error('Erro ao excluir tarefa');
                }
                
                loadTasks();
            } catch (error) {
                document.getElementById('list-error').textContent = 'Erro ao excluir tarefa: ' + error.message;
            }
        }
        
        document.addEventListener('DOMContentLoaded', loadTasks);
    </script>
</body>
</html>
```

## Execução

1. Compilar o projeto:
```
npm run build
```

2. Iniciar o servidor:
```
npm start
```

3. Para desenvolvimento:
```
npm run dev
```

4. Acessar o frontend abrindo o arquivo `frontend/index.html` no navegador.

## Adaptação para Outros Projetos

Para adaptar este projeto para outros temas:

1. Modificar as interfaces no controller e service
2. Ajustar os endpoints conforme necessário
3. Atualizar o frontend para refletir as mudanças na API
