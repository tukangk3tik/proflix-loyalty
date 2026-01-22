import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../enum/auth-type.enum';
import { AUTH_TYPE_KEY } from '../decorators/auth-type.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredTypes || requiredTypes.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (!user || !user.type) {
      throw new ForbiddenException('Access denied');
    }

    const hasAccess = requiredTypes.includes(user.type);

    if (!hasAccess) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
