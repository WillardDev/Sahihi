import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service"; 
import { CreateUserDto } from "src/dto/user/create-user.dto";
import { User } from "src/users/user.entity";
import { Public } from "../auth/public-strategy"; 
import { Roles } from "src/auth/role.decorator";
import { Role } from "src/auth/enum/role.enum";
import { RolesGuard } from "src/auth/guards/role.guard";
import { AuthGuard } from "@nestjs/passport";
import { JwtRolesGuard } from "src/auth/guards/jwt-role.guard";

@Controller('users')
// @UseGuards(JwtRolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Get()
    @Roles(Role.Admin)
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    @Roles(Role.Admin, Role.ProjectManager)
    async findOne(@Param('id') id: string): Promise<User> {
        return await this.usersService.findOneById(id);
    }

    @Post() 
    @Roles(Role.Admin)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @Delete(':id') 
    @Roles(Role.Admin)
    async remove(@Param('id') id: string): Promise<void> {
        return await this.usersService.remove(id);
    }

    @Put(':id') 
    @Roles(Role.Admin)
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.update(id, updateUserDto);
    }
}
