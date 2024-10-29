import { ProjectModule } from './projects/project.module';
import { CrmModule } from './crm/crm.module';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { RolesGuard } from './auth/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ProjectModule,
    CrmModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
