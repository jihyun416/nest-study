import {
  Resolver,
  ResolveField,
  Parent,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { Author } from '../author/entities/author.entity';
import { UpvotePostInput } from './dto/upvote-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @Mutation((returns) => Post)
  async upvotePost(@Args('upvotePostData') upvotePostData: UpvotePostInput) {
    return this.postService.upvoteById(upvotePostData.postId);
  }
}
