import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseUser } from "src/dto/user/base-user.dto";
import { Public } from "./public-strategy";
import { CreateUserDto } from "src/dto/user/create-user.dto"; // Make sure to import your CreateUserDto

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    @ApiOperation({ summary: "User Login" })
    @ApiResponse({
        status: 200,
        description: "The User found",
        type: [BaseUser],
    })
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signup")
    @ApiOperation({ summary: "User Signup" })
    @ApiResponse({
        status: 200,
        description: "The record found",
        type: [BaseUser],
    })
    signUp(@Body() signUpDto: CreateUserDto) {  // Use CreateUserDto for type safety
        const payload: CreateUserDto = {
            firstName: signUpDto.firstName,
            lastName: signUpDto.lastName,
            email: signUpDto.email, 
            password: signUpDto.password,
            phoneNumber: signUpDto.phoneNumber,
            address: signUpDto.address,
            kraPin: signUpDto.kraPin,
            role: signUpDto.role,
            createdAt: new Date()  // If createdAt is not part of CreateUserDto, handle it in the service or entity
        };
        return this.authService.signUp(payload);
    }
}
