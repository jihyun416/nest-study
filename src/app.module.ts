import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { CatsModule } from './cats/cats.module';

@Module({
  controllers: [AppController, AccountController],
  providers: [AppService],
  imports: [CatsModule],
})
export class AppModule {}
