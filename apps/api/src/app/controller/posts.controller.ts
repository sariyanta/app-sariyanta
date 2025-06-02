import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostsService } from '../service/posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  private readonly logger = new Logger(PostsController.name);
  constructor(private readonly postService: PostsService) {}

  @Get(':slug')
  async getPost(@Param('slug') slug: string) {
    try {
      const post = await this.postService.getPostBySlug(slug);
      if (!post) {
        this.logger.warn(`Post with slug ${slug} not found`);
        throw new NotFoundException('Post not found');
      }
      return post;
    } catch (error) {
      this.logger.error(`Failed to fetch post with slug ${slug}`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get()
  async getPosts() {
    try {
      const postsResponse = await this.postService.getPosts();
      if (!postsResponse?.length) {
        this.logger.warn('No posts found');
        return [];
      }
      return postsResponse;
    } catch (error) {
      this.logger.error('Failed to fetch posts', error);
      throw error;
    }
  }

  @Get('search-deals')
  async searchDeals() {
    return this.postService.searchDeals();
  }
}
