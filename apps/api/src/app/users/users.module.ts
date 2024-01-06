import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { forFeature, Project, User } from '@typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forFeature(
      User,
      Project
    )
  ],
})
export class UsersModule {}
