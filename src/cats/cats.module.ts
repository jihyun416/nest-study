import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

const mockCatsService = {
  /* mock implementation
  ...
  */
};

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
  ],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
