import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';
import { ROLES_KEY } from '../role.decorator';
import { IS_PUBLIC_KEY } from '../public-strategy';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('RolesGuard - canActivate called');
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required roles:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('User from request:', user);
    
    if (!user) {
      console.log('No user found in request');
      throw new ForbiddenException('No user found in request');
    }

    console.log('User role:', user.role);
    console.log('Required roles:', requiredRoles);

    // Check if the user's role matches any of the required roles
    const hasRole = requiredRoles.includes(user.role);
    
    console.log('Has required role:', hasRole);

    if (!hasRole) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
