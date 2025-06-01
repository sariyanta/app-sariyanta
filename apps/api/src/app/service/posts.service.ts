import { Client } from '@hubspot/api-client';
import { BlogPost } from '@hubspot/api-client/lib/codegen/cms/blogs/blog_posts';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { type Cache } from 'cache-manager';

import { HUBSPOT_CLIENT } from '../constant/hubspot.constant';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @Inject(HUBSPOT_CLIENT) private readonly hubspotClient: Client,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getPostBySlug(slug: string) {
    try {
      const allPosts = await this.getPosts();
      if (!allPosts?.length) {
        this.logger.warn('No posts found');
        return null;
      }

      const post = allPosts.find((post) => post.slug === slug);
      if (!post) {
        this.logger.warn(`Post with slug ${slug} not found`);
        return null;
      }

      return post;
    } catch (error) {
      this.logger.error(`Failed to fetch posts`, error);
      throw new Error(`Failed to fetch post with slug: ${slug}`);
    }
  }

  async getBlogPosts() {
    this.logger.log('Fetching blog posts from HubSpot');
    const createdAt = undefined;
    const createdAfter = undefined;
    const createdBefore = undefined;
    const updatedAt = undefined;
    const updatedAfter = undefined;
    const updatedBefore = undefined;
    const sort = undefined;
    let after: string | undefined = undefined;
    const limit = 100;
    const archived = false;
    const blogPosts: BlogPost[] = [];

    do {
      try {
        const apiResponse =
          await this.hubspotClient.cms.blogs.blogPosts.basicApi.getPage(
            createdAt,
            createdAfter,
            createdBefore,
            updatedAt,
            updatedAfter,
            updatedBefore,
            sort,
            after,
            limit,
            archived,
          );
        if (!apiResponse.results?.length) {
          this.logger.warn('No posts found');
          return blogPosts;
        }
        blogPosts.push(
          ...apiResponse.results.filter((post) => post.currentlyPublished),
        );
        after = apiResponse?.paging?.next?.after || undefined;
      } catch (error) {
        this.logger.error('Failed to fetch posts', error);
        throw error;
      }
    } while (after);

    return blogPosts;
  }

  async getPosts() {
    return await this.cacheManager.wrap(
      'blog_posts',
      () => this.getBlogPosts(),
      {
        ttl: 60 * 60 * 60, // Cache for 1 hour
      },
    );
  }
}
