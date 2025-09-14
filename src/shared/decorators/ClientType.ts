import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export type ClientTypeValue = 'mobile' | 'web';

export const ClientType = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.headers['x-client-type'] as ClientTypeValue;
});
