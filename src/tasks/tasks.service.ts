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
