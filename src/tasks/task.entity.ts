import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from 'src/tasks/task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatusEnum;
}
