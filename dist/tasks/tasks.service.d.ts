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
export declare class TasksService {
    private tasks;
    findAll(): Task[];
    findOne(id: number): Task;
    create(createTaskDto: CreateTaskDto): Task;
    update(id: number, updateTaskDto: UpdateTaskDto): Task;
    remove(id: number): void;
}
