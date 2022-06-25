import { TaskStatus } from 'src/tasks/task.model';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
