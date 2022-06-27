import { IsOptional, IsString } from 'class-validator';

export class GetTodolistsDto {
  @IsOptional()
  @IsString()
  search?: string;
}
