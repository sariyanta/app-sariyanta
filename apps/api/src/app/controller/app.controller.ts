import { Controller, Get, Inject, Logger, Param } from '@nestjs/common';

import { AppService } from '../service/app.service';
import { Client } from '@hubspot/api-client';
import { CONFIG_PROVIDER, TConfig } from 'src/config/configuration';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  private readonly hubspotClient: Client;
  constructor(
    private readonly appService: AppService,
    @Inject(CONFIG_PROVIDER) private readonly config: TConfig,
  ) {
    const accessToken = this.config.HUBSPOT_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error(
        'HUBSPOT_ACCESS_TOKEN is not defined in the environment variables',
      );
    }
    this.hubspotClient = new Client({ accessToken });
    // this.hubspotClient =
  }

  @Get()
  ping(): string {
    return this.appService.ping();
  }

  @Get('posts/:slug')
  async getPost(@Param('slug') slug: string) {
    try {
      const postResponse =
        await this.hubspotClient.cms.blogs.blogPosts.basicApi.getById(slug);
      return postResponse;
    } catch (error) {
      this.logger.error(`Failed to fetch post with slug: ${slug}`, error);
      throw error;
    }
  }

  @Get('posts')
  async getPosts() {
    try {
      const postsResponse =
        await this.hubspotClient.cms.blogs.blogPosts.basicApi.getPage();
      if (!postsResponse?.results?.length) {
        this.logger.warn('No posts found');
        return { results: [], total: 0 };
      }
      return postsResponse.results.filter((post) => post.currentlyPublished);
    } catch (error) {
      this.logger.error('Failed to fetch posts', error);
      throw error;
    }
  }
}
