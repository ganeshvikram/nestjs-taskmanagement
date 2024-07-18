import { AuthService } from './auth.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query,UsePipes,ValidationPipe,ParseIntPipe  } from '@nestjs/common';
import { UserCredentialsDto } from './dto/userCredentialsDto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){};

    @Post('signup')
    createTask(@Body(ValidationPipe) userCredentialsDto:UserCredentialsDto): Promise<void>{
        return this.authService.signup(userCredentialsDto);
    }

    @Post('signin')
    signIn(@Body(ValidationPipe) userCredentialsDto:UserCredentialsDto): Promise<({accessToken:string})>{
        return this.authService.signin(userCredentialsDto);
    }


}
