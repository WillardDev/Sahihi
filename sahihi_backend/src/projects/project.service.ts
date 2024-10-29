import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ) {}

    findAll(): Promise<Project[]> {
        return this.projectsRepository.find();
    }

    findOne(id: number): Promise<Project> {
        return this.projectsRepository.findOne({ where: {id} });
    }

    async create(project: Partial<Project>): Promise<Project> {
        const newProject = this.projectsRepository.create(project);
        return this.projectsRepository.save(newProject);
    }

    async update(id: number, projectData: Partial<Project>): Promise<Project> {
        await this.projectsRepository.update(id, projectData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.projectsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
    }
}
