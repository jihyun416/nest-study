import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { AuthorRepository } from './author.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository]), PostModule],
  providers: [AuthorResolver, AuthorService],
})
export class AuthorModule {}
