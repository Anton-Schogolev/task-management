import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todolist } from 'src/todolists/todolist.entity';
import { Repository } from 'typeorm';
import { GetTodolistsDto } from 'src/todolists/dto/get-todolists.dto';
import { User } from 'src/auth/user.entity';
import { CreateTodolistDto } from 'src/todolists/dto/create-todolist.dto';

@Injectable()
export class TodolistsService {
  constructor(
    @InjectRepository(Todolist)
    private todolistRepository: Repository<Todolist>,
  ) {}

  async getTodolists(
    { search }: GetTodolistsDto,
    user: User,
  ): Promise<Todolist[]> {
    const query = this.todolistRepository.createQueryBuilder('task');
    query.where({ user });
    if (search)
      query.andWhere('(LOWER(todolist.title) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    return query.getMany();
  }

  async getTodolistById(id: string, user: User): Promise<Todolist> {
    const foundTodolist = await this.todolistRepository.findOneBy({ id, user });
    if (!foundTodolist) throw new NotFoundException();
    return foundTodolist;
  }

  async deleteTodolistById(id: string, user: User) {
    const deleteResult = await this.todolistRepository.delete({ id, user });
    if (!deleteResult.affected) {
      throw new NotFoundException();
    }
  }

  async createTodolist(
    createTodolistDto: CreateTodolistDto,
    user: User,
  ): Promise<Todolist> {
    const { title } = createTodolistDto;

    const task = this.todolistRepository.create({
      title,
      user,
    });

    return await this.todolistRepository.save(task);
  }

  async updateTodolist(
    id: string,
    updateTodolistDto: CreateTodolistDto,
    user: User,
  ): Promise<Todolist> {
    let todolist = await this.getTodolistById(id, user);
    todolist = this.todolistRepository.merge(todolist, updateTodolistDto);
    return this.todolistRepository.save(todolist);
  }
}
