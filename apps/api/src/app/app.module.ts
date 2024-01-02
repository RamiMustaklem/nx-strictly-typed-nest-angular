import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormModule } from '@typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeormModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
