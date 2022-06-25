import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from 'src/tasks/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters({ search = '', status }: GetTasksFilterDto): Task[] {
    return this.tasks.filter(task => {
      return (
        !status || task.status === status
      ) && (
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  getTaskById(id: string): Task | null {
    let foundTask = this.tasks.find(task => task.id === id);
    if (!foundTask)
      throw new NotFoundException()
    return foundTask;
  }

  deleteTaskById(id: string) {
    let isIdValid = false;
    this.tasks = this.tasks.filter(task => {
      if (task.id === id) {
        isIdValid = true;
        return false
      }
      return true;
    });
    if (!isIdValid) {
      throw new NotFoundException()
    }
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
