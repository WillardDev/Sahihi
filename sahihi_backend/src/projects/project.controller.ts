// src/projects/projects.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { Project } from './project.entity';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Public } from 'src/auth/public-strategy';

@Controller('projects')
@Public()
// @UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Public()
    @Get()
    async findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    }

    @Get(':id')
    @Roles(Role.Admin, Role.ProjectManager, Role.Engineer)
    async findOne(@Param('id') id: number): Promise<Project> {
        return this.projectsService.findOne(id);
    }

    @Post()
    // @Roles(Role.Admin, Role.ProjectManager)
    async create(@Body() projectData: Partial<Project>): Promise<Project> {
        return this.projectsService.create(projectData);
    }

    @Put(':id')
    // @Roles(Role.Admin, Role.ProjectManager)
    async update(@Param('id') id: number, @Body() projectData: Partial<Project>): Promise<Project> {
        return this.projectsService.update(id, projectData);
    }

    @Delete(':id')
    // @Roles(Role.Admin)
    async remove(@Param('id') id: number): Promise<void> {
        return this.projectsService.remove(id);
    }
}
