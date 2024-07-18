import {Repository} from 'typeorm'
import { Injectable , NotFoundException} from '@nestjs/common';
import { User } from "src/entities/user.entity";

@Injectable()
export class UserRepository extends Repository<User> {
    
 
}