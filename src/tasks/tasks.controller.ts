import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { Task } from 'src/tasks/task.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from 'src/tasks/dto/update-task-status.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todolists/:todolistId/tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Param('todolistId') todolistId: string,
    @Query() filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, todolistId);
  }

  @Get('/:id')
  getTaskById(
    @Param('todolistId') todolistId: string,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, todolistId);
  }

  @Delete('/:id')
  deleteTask(@Param('todolistId') todolistId: string, @Param('id') id: string) {
    return this.taskService.deleteTaskById(id, todolistId);
  }

  @Post()
  async createTask(
    @Param('todolistId') todolistId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, todolistId);
  }

  @Patch('/:id')
  updateTask(
    @Param('todolistId') todolistId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto, todolistId);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('todolistId') todolistId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto, todolistId);
  }
}
