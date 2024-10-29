import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesGuard } from './role.guard';

@Injectable()
export class JwtRolesGuard extends AuthGuard('jwt') {
  private rolesGuard: RolesGuard;

  constructor(private reflector: Reflector) {
    super();
    this.rolesGuard = new RolesGuard(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, verify the JWT token
    const jwtAuthenticated = await super.canActivate(context);
    
    if (!jwtAuthenticated) {
      return false;
    }

    // Then check the roles
    return this.rolesGuard.canActivate(context);
  }
}