import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/task.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from 'src/tasks/dto/update-task-status.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasksWithFilters(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }
}
