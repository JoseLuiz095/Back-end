"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
let TasksService = class TasksService {
    constructor() {
        this.tasks = [
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
    }
    findAll() {
        return this.tasks;
    }
    findOne(id) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new Error(`Tarefa com ID ${id} não encontrada`);
        }
        return task;
    }
    create(createTaskDto) {
        const newTask = {
            id: this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1,
            ...createTaskDto,
            completed: false,
        };
        this.tasks.push(newTask);
        return newTask;
    }
    update(id, updateTaskDto) {
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
    remove(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            throw new Error(`Tarefa com ID ${id} não encontrada`);
        }
        this.tasks.splice(taskIndex, 1);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map