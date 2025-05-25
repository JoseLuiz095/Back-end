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
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Task[];
    findOne(id: string): Task;
    create(createTaskDto: CreateTaskDto): Task;
    update(id: string, updateTaskDto: UpdateTaskDto): Task;
    remove(id: string): void;
}
