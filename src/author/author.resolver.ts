import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import { PostService } from '../post/post.service';
import { GetAuthorArgs } from './dto/get-author.args';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly postService: PostService,
  ) {}

  @Query(() => [Author], { name: 'authors' })
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Query((returns) => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorService.findOne(id);
  }

  @Query((returns) => [Author])
  async findAuthor(@Args() args: GetAuthorArgs) {
    return this.authorService.find(args);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postService.findByAuthorId(id);
  }
}
