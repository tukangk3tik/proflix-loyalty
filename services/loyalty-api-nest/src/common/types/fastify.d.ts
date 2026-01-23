import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';

/**
 * Extending FastifyRequest to include user property of type JwtPayload
 */
declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}
