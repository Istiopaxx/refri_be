import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthRepository } from '../repositories/auth.repository';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@app/common/decorators/public.decorator';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const sessionToken = this.extractTokenFromHeader(request);
    if (!sessionToken && !isPublic) {
      throw new UnauthorizedException();
    } else if (!sessionToken && isPublic) {
      return true;
    }
    try {
      const session = await this.authRepository.findBySessionToken(
        sessionToken,
      );
      request['user'] = session.user;
      request['sessionToken'] = session.session_token;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
