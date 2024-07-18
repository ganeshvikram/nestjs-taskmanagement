import { Body, Controller, Delete, Get, Param, Patch, Post, Query,UsePipes,ValidationPipe,ParseIntPipe,UseGuards,Req  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.model';
import { CreateTAskDto } from './dto/CreateTaskDto';
import { FilterTaskDto } from './dto/FilterTaskDto';
import { Task } from 'src/entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';


@Controller('tasks')

export class TasksController {
    constructor(private taskService: TasksService){};
    @Get('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req);
    }

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id: number): Promise<Task>{
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body(ValidationPipe) createTaskDto :CreateTAskDto): Promise<Task>{
        console.log(createTaskDto);
        return this.taskService.crerateTasks(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id',ParseIntPipe) id: number): Promise<void>{
        return this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: number ,
        @Body('status') status: TaskStatus): Promise<Task>{
            return this.taskService.updateTaskStatusById(id,status);
    }

    @Get()
    getTasks(@Query(ValidationPipe) query: FilterTaskDto): Promise<Task[]>{
    
            return this.taskService.getAllTasks(query);
        
    }

    


    /*@Get()
    getTasks(@Query(ValidationPipe) query: FilterTaskDto): Task[]{

        if(Object.keys(query).length){
            return this.taskService.getTasksByFilter(query);
        }else{
            return this.taskService.getAllTasks();
        }
        
    }


    @Post()
    createTask(@Body(ValidationPipe) createTaskDto :CreateTAskDto): Task{
        console.log(createTaskDto);
        return this.taskService.crerateTasks(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task{
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Task[]{
        console.log(id);
        return this.taskService.deleteTaskById(id);
    }

    
        */


}
