import {
  createParamDecorator,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (_, ctx: ExecutionContext) => {
    const { userId } = ctx.switchToHttp().getRequest();

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  },
);
