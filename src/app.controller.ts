import {
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('forbidden')
  async forbiddenTest() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('forbidden2')
  async forbiddenTest2() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('forbidden3')
  async forbiddenTest3() {
    throw new ForbiddenException();
  }
}
