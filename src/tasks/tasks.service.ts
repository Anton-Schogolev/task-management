import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TaskStatusEnum } from 'src/tasks/task-status.enum';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  getTasks({ search, status }: GetTasksFilterDto, user: User): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
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

  async getTaskById(id: string, user: User): Promise<Task> {
    const foundTask = await this.taskRepository.findOneBy({ id, user });
    if (!foundTask) throw new NotFoundException();
    return foundTask;
  }

  async deleteTaskById(id: string, user: User) {
    const deleteResult = await this.taskRepository.delete({ id, user });
    if (!deleteResult.affected) {
      throw new NotFoundException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description = '' } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
      user,
    });

    return await this.taskRepository.save(task);
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    let task = await this.getTaskById(id, user);
    task = this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }
}
