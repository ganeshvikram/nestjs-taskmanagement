import { Task } from "src/entities/task.entity";
import {Repository} from 'typeorm'
import { Injectable , NotFoundException} from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task> {

    

}