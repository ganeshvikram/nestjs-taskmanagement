import { TypeOrmModuleOptions  } from '@nestjs/typeorm';
export const typeORMConfig : TypeOrmModuleOptions={
      type: 'postgres',
      host: 'localhost', // Update with your PostgreSQL host
      port: 5432, // Default PostgreSQL port
      username: 'postgres', // Update with your PostgreSQL username
      password: 'postgres', // Update with your PostgreSQL password
      database: 'taskmanagement', // Update with your PostgreSQL database name
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // For development use only; in production, use migrations
}


