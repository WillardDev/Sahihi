import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "src/dto/user/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneBy(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect Password!!');
    }

    // Include role in the JWT payload
    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role  // Add the role to the JWT payload
    };

    console.log('JWT Payload:', payload); // Debug log

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        address: user.address,
        kraPin: user.kraPin,
        phone: user.phoneNumber,
      }
    };
  }

  async signUp(payload: CreateUserDto) {
    // Check if the email is already in use
    const existingUser = await this.usersService.findOneBy(payload.email);
    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }

    // Generate salt and hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    // Create new user with hashed password
    const userWithHashedPassword = {
      ...payload,
      password: hashedPassword,
    };

    const user = await this.usersService.create(userWithHashedPassword);
    
    // Remove password from returned user object
    const { password, ...result } = user;
    return result;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
