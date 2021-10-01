import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AccountController } from './account/account.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [AppController, CatsController, AccountController],
  providers: [AppService, CatsService],
})
export class AppModule {}
