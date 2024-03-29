import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Project } from './entities/Project.entity';
import { IsUniqueConstraint } from './IsUniqueValidator';
import { ParseJsonPipe } from './transformers/parse-json.pipe';

@Module({
  controllers: [],
  providers: [IsUniqueConstraint, ParseJsonPipe],
  exports: [ParseJsonPipe],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs-angular-mono',
      entities: [User, Project],
      synchronize: process.env['NODE_ENV'] !== 'production',
    }),
  ],
})
export class TypeormModule {}
