import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { Task, TaskStatus } from 'src/tasks/task.model';
import { CreateTaskDto} from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
  }

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): number {
    return this.taskService.deleteTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch("/:id")
  updateTask(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body("status") status: TaskStatus): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
