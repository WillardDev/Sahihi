import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './project.service';
import { ProjectsController } from './project.controller';
import { Project } from './project.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [
        ProjectsService, ProjectsService],
    controllers: [
        ProjectsController, ProjectsController],
    exports: [ProjectsService]
})
export class ProjectModule { }
