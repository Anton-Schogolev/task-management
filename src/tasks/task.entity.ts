import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from 'src/tasks/task-status.enum';
import { Exclude } from 'class-transformer';
import { Todolist } from 'src/todolists/todolist.entity';

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

  @ManyToOne(() => Todolist, (todolist) => todolist.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  todolist: Todolist;
}
