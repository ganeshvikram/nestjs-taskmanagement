import { Injectable , NotFoundException} from '@nestjs/common';
import { TaskStatus } from './task.model';
import { FilterTaskDto } from './dto/FilterTaskDto';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository} from '@nestjs/typeorm';
import { CreateTAskDto } from './dto/CreateTaskDto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ){}


    async getTaskById(id:number):Promise<Task>{
        let task =  await this.taskRepository.findOne({ where: { id } })
        if(!task){
            throw new NotFoundException(`requested id ${id} not exists`)
        }
        return task;
    }


    async crerateTasks(createTaskDto:CreateTAskDto): Promise<Task>{

        const {title,description} = createTaskDto;

        let newTask = new Task();
        newTask.title = title;
        newTask.description = description;
        newTask.status = TaskStatus.OPEN;

        await this.taskRepository.save(newTask);
        return newTask;


    }

    async deleteTaskById(id:number): Promise<void>{
        
       let result =  await this.taskRepository.delete(id)
       if(!result.affected){
            throw new NotFoundException(`requested id ${id} not exists`)
        }
    }

    async updateTaskStatusById(id:number, status:TaskStatus):Promise<Task>{
        let task =  await this.getTaskById(id)
        task.status = status
        task =  await this.taskRepository.save(task)
        return task;
    }

    async getAllTasks (input:FilterTaskDto):Promise<Task[]>{

        const {status, search} = input;

        const query = this.taskRepository.createQueryBuilder('task')

        if(status){

            query.andWhere('task.status=:status',{status})

        }

        if(search){
            query.andWhere('task.title like :search or task.description like :search ',{status:'%{search}%' })
        }

        let tasks =  await query.getMany();

        return tasks;

    }

    /*getTasksByFilter(query: FilterTaskDto): Task[]{

       const {status,search} = query;

       let tasks = this.getAllTasks();

       if(status){
        tasks = tasks.filter(task=>task.status==status)
       }

       if(search){
        tasks = tasks.filter(task=>(task.title.includes(search)||task.description.includes(search)))
       }

       return tasks;

    }

    getAllTasks():Task[]{
        return this.tasks;
    }

    crerateTasks(createTaskDto): Task{

        const {title,description} = createTaskDto;

       const task: Task= {
            id:uuidv4() ,
            title:title,
            description:description,
            status:TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;

    }

    getTaskById(id:string):Task{
        let task =  this.tasks.find(task=>id==task.id)
        if(!task){
            throw new NotFoundException(`requested id ${id} not exists`)
        }
        return task;
    }

    deleteTaskById(id:string):Task[]{
        const taskReq = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== taskReq.id);
        return this.tasks;
    }

    updateTaskStatusById(id:string, status:TaskStatus):Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }*/
}
