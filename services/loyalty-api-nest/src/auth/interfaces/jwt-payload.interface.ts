import { AuthType } from '../enum/auth-type.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  type: AuthType;
  role?: string;
  iat?: number;
  exp?: number;
}
