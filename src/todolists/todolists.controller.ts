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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { TodolistsService } from 'src/todolists/todolists.service';
import { GetTodolistsDto } from 'src/todolists/dto/get-todolists.dto';
import { Todolist } from 'src/todolists/todolist.entity';
import { CreateTodolistDto } from 'src/todolists/dto/create-todolist.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todolists')
@UseGuards(AuthGuard('jwt'))
export class TodolistsController {
  constructor(private todolistsService: TodolistsService) {}

  @Get()
  getTodolists(
    @Query() filterDto: GetTodolistsDto,
    @GetUser() user: User,
  ): Promise<Todolist[]> {
    return this.todolistsService.getTodolists(filterDto, user);
  }

  @Get('/:id')
  getTodolistById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Todolist> {
    return this.todolistsService.getTodolistById(id, user);
  }

  @Delete('/:id')
  deleteTodolist(@Param('id') id: string, @GetUser() user: User) {
    return this.todolistsService.deleteTodolistById(id, user);
  }

  @Post()
  async createTodolist(
    @Body() createTodolistDto: CreateTodolistDto,
    @GetUser() user: User,
  ): Promise<Todolist> {
    return this.todolistsService.createTodolist(createTodolistDto, user);
  }

  @Patch('/:id')
  updateTodolist(
    @Param('id') id: string,
    @Body() updateTodolistDto: CreateTodolistDto,
    @GetUser() user: User,
  ): Promise<Todolist> {
    return this.todolistsService.updateTodolist(id, updateTodolistDto, user);
  }
}
