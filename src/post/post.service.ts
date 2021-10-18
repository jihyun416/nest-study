import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findByAuthorId(authorId: number): Promise<Post[]> {
    return await this.postRepository.find({ authorId: authorId });
  }

  async upvoteById(postId: number): Promise<Post> {
    const post = await this.postRepository.findOne({ id: postId });
    post.votes = post.votes + 1;
    return await this.postRepository.save(post);
  }
}
