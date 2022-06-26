import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

export const GetUser = createParamDecorator((data, ctx): User => {
  return ctx.switchToHttp().getRequest().user;
});
