import { ValidateIf, IsNotEmpty } from 'class-validator';
export class CreateTAskDto{
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string
}