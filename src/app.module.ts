import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { CatsModule } from './cats/cats.module';
import { logger } from './logger.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { RolesGuard } from './auth/roles.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthorModule } from './author/author.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController, AccountController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    CatsModule,
    UsersModule,
    AuthorModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .exclude({ path: 'cats', method: RequestMethod.POST }, 'cats/(.*)')
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
