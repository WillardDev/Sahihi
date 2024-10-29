import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { databaseConstants } from './config/database.constants'; // Adjust the path as necessary

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables if you need them elsewhere
    TypeOrmModule.forRoot({
      type: databaseConstants.type,
      host: databaseConstants.host,
      port: databaseConstants.port,
      username: databaseConstants.username,
      password: databaseConstants.password,
      database: databaseConstants.database,
      synchronize: true,
      autoLoadEntities: true,
      connectTimeout: databaseConstants.connectTimeout,
    }),
    TypeOrmModule.forFeature([User, Project]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
