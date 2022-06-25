import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from 'src/tasks/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto} from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';


@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | null {
    return this.tasks.find(task => task.id === id) || null;
  }

  deleteTaskById(id: string): number {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return 200;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description = '' } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    const { title = task.title, description = task.description, status = task.status } = updateTaskDto;
    task.title = title;
    task.description = description;
    task.status = status;

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
