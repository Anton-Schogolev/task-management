import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/task.entity';

@Entity()
export class Todolist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.todolists, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany(() => Task, (task) => task.todolist, { eager: true })
  @Exclude({ toPlainOnly: true })
  tasks: Task[];
}
