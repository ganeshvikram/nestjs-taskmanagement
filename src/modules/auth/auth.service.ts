import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository} from '@nestjs/typeorm';
import { UserCredentialsDto } from './dto/userCredentialsDto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { identity } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService:JwtService
    ){}

    async signup(userCredentialsDto:UserCredentialsDto): Promise<void>{

        const {username,password} = userCredentialsDto;

        const salt = await bcrypt.genSalt();

        let newUser = new User();
        newUser.username = username;
        newUser.salt = salt;
        newUser.password = await bcrypt.hash(password, salt);

        try{
            await this.userRepository.save(newUser);

        }catch(e){

            if(e.code='23585'){
                throw new ConflictException(`requested usename already exists`)
            }else{
                throw new InternalServerErrorException();
            }

        }

    }
       /* async signin(userCredentialsDto:UserCredentialsDto): Promise<string>{

            const {username,password} = userCredentialsDto;
    
            const user  = await this.userRepository.findOne({where: { username }})

            console.log(await user.validatePassword(password))

            if(user && await user.validatePassword(password)){
                return user.username;

            }else{
                throw new UnauthorizedException();
            }

            const payload = {username}
            const accesstoken = await this.jatService.sign(payload)
    

        }*/

        async signin(userCredentialsDto:UserCredentialsDto): Promise<({accessToken:string})>{

            const {username,password} = userCredentialsDto;
    
            const user  = await this.userRepository.findOne({where: { username }})

            console.log(await user.validatePassword(password))

            if(!user){
                throw new UnauthorizedException();
            }

            const payload = {username}
            const accessToken = await this.jwtService.sign(payload)

            return {accessToken}
    

        }




}
