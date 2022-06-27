import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodolistDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  title: string;
}
