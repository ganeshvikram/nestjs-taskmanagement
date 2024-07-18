import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy} from './JwtStrategy';
import { UserRepository } from './user.repository';

@Module({

    imports:[
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: 'sec123',
        signOptions: { expiresIn: '1h' },
      }),
        TypeOrmModule.forFeature([User])
      ],
        controllers: [AuthController],
        providers: [AuthService, JwtStrategy,UserRepository],
        exports: [JwtModule,PassportModule]
})
export class AuthModule {}
