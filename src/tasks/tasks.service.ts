import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TaskStatusEnum } from 'src/tasks/task-status.enum';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  getTasks(
    { search, status }: GetTasksFilterDto,
    todolistId: string,
  ): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ todolist: { id: todolistId } });
    if (search)
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    if (status) query.andWhere({ status });
    return query.getMany();
  }

  async getTaskById(id: string, todolistId: string): Promise<Task> {
    const foundTask = await this.taskRepository.findOneBy({
      id,
      todolist: { id: todolistId },
    });
    if (!foundTask) throw new NotFoundException();
    return foundTask;
  }

  async deleteTaskById(id: string, todolistId: string) {
    const deleteResult = await this.taskRepository.delete({
      id,
      todolist: { id: todolistId },
    });
    if (!deleteResult.affected) {
      throw new NotFoundException();
    }
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    todolistId: string,
  ): Promise<Task> {
    const { title, description = '' } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
      todolist: { id: todolistId },
    });

    return await this.taskRepository.save(task);
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    todolistId: string,
  ): Promise<Task> {
    let task = await this.getTaskById(id, todolistId);
    task = this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }
}
