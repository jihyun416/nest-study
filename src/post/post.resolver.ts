import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { Author } from '../author/entities/author.entity';

@Resolver(() => Post)
export class PostResolver {}
