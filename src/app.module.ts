import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { CatsModule } from './cats/cats.module';
import { logger } from './logger.middleware';

@Module({
  controllers: [AppController, AccountController],
  providers: [AppService],
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .exclude({ path: 'cats', method: RequestMethod.POST }, 'cats/(.*)')
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
