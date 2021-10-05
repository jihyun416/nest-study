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
  UseFilters,
  ParseIntPipe,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto, UpdateCatDto } from './dto/cat.dto';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../exception/http-exception.filter';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseFilters(HttpExceptionFilter)
@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
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
