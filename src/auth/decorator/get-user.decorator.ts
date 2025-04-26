import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/model/user.entity';
import { plainToInstance } from 'class-transformer';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return plainToInstance(User, req.user, {
      excludeExtraneousValues: false,
    });
  },
);
