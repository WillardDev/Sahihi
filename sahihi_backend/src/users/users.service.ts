import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dto/user/create-user.dto";
import { User } from "src/users/user.entity";
import { DeepPartial, MongoRepository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: MongoRepository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find(); // Fetch all users
    }

    async findOneBy(email: string): Promise<User | undefined> {
        return await this.userRepository.findOneBy({ email: email });
    }

    async findOneById(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: Number(id) });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return user;
    }

    async create(createUserDto: CreateUserDto) {
        return this.userRepository.save({
            ...createUserDto,
            createdAt: new Date() as DeepPartial<Date>,
            id: createUserDto.id ? Number(createUserDto.id) : undefined,
        });
    }

    async remove(id: string): Promise<void> {
        const result = await this.userRepository.delete({ id: Number(id) });
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
    }

    async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
        const user = await this.findOneById(id); // Check if user exists
    
        // Ensure id is of type number
        const updatedUser: User = {
            ...user,  // Spread existing user properties
            ...updateUserDto, // Update with new values
            id: user.id, // Ensure to keep the original id
        };
    
        return await this.userRepository.save(updatedUser); // Save the updated user
    }
    
}
