import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import {
  Request,
} from "express";

@Injectable()
export class AuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return request["sub"] != null;
  }
}

export const UserAuth = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const ctx = context.switchToHttp();
  const req = ctx.getRequest<Request>();
  return req["sub"];
});
