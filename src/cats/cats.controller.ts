import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  Header,
  Param,
  Redirect,
  Body,
  Put,
  Delete,
  Res,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Res({ passthrough: true }) res: Response) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(HttpStatus.OK);
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  @Get('request')
  findRequest(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get('wildcard/ab*cd')
  findByWildcardPath() {
    return 'This route uses a wildcard';
  }

  @Post('response/204')
  @HttpCode(204)
  response204() {
    return 'This action adds a new cat';
  }

  @Post('header/cache')
  @Header('Cache-Control', 'none')
  customHeader() {
    return 'This action adds a new cat';
  }

  @Get('redirect/nestjs')
  @Redirect('https://nestjs.com', 301)
  redirect() {
    return 'Redirect';
  }

  @Get('async/promise')
  async findPromise(): Promise<any[]> {
    return [];
  }

  @Get('async/observable')
  findObservable(): Observable<any[]> {
    return of([]);
  }
}
