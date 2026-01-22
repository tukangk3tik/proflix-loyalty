import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enum/auth-type.enum';

export const AUTH_TYPE_KEY = 'authType';
export const RequireAuthType = (...types: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, types);

// Convenience decorators
export const MemberOnly = () => RequireAuthType(AuthType.MEMBER);
export const UserOnly = () => RequireAuthType(AuthType.USER);
export const MemberOrUser = () =>
  RequireAuthType(AuthType.MEMBER, AuthType.USER);
