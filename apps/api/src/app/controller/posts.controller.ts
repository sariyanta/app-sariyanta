import { Client } from '@hubspot/api-client';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { PostsService } from '../service/posts.service';

@Controller()
export class PostsController {
  private readonly logger = new Logger(PostsController.name);
  private readonly hubspotClient: Client;
  constructor(private readonly postService: PostsService) {}

  @Get('posts/:slug')
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

  @Get('posts')
  async getPosts() {
    try {
      const postsResponse =
        await this.hubspotClient.cms.blogs.blogPosts.basicApi.getPage();
      if (!postsResponse?.results?.length) {
        this.logger.warn('No posts found');
        return [];
      }
      return postsResponse.results.filter((post) => post.currentlyPublished);
    } catch (error) {
      this.logger.error('Failed to fetch posts', error);
      throw error;
    }
  }
}
