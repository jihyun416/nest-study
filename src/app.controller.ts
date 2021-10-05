import {
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './decorator/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  async findUser(
    @User(new ValidationPipe({ validateCustomDecorators: true })) user: any,
  ) {
    console.log(user);
  }

  @Get('firstname')
  async findUserFirstName(@User('firstName') firstName: string) {
    console.log(`Hello ${firstName}`);
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
