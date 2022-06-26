import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from 'src/tasks/task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
