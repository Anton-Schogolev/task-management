import { Module } from '@nestjs/common';
import { TodolistsController } from './todolists.controller';
import { TodolistsService } from './todolists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todolist } from 'src/todolists/todolist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todolist])],
  controllers: [TodolistsController],
  providers: [TodolistsService],
})
export class TodolistsModule {}
