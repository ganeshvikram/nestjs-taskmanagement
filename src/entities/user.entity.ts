import {Entity,Column,PrimaryGeneratedColumn,Unique} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    salt:string

    @Column()
    password:string

    async validatePassword(password: string): Promise<boolean>{

        const hash = await bcrypt.hash(password, this.salt);

        return (hash === this.password)

    }

}
