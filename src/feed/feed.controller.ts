import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  FeedService,
} from "./feed.service";
import {
  AuthGuard,
  UserAuth,
} from "src/auth/auth.guard";
import {
  CreateFeedDTO,
} from "./dto";

@Controller()
export class FeedController {

  constructor(
    private readonly feedService: FeedService,
  ) { }

  /**
   * goal에서 생성하는 피드
   */
  @UseGuards(AuthGuard)
  @Post()
  public async createFeed(
    @UserAuth() userId: number,
    @Body() body: CreateFeedDTO,
  ) {
    const feed = await this.feedService.createGoalFeed(body.subGoalId, userId, body.content, body.image);
    return {
      success: true,
      data: feed,
    };
  }

  /**
   * 피드에서 대댓글로 생성하는 피드
   */
  @UseGuards(AuthGuard)
  @Post(":feed_id")
  public async createChildFeed(
    @UserAuth() userId: number,
    @Param("feed_id", new ParseIntPipe()) feedId: number,
    @Body() body: CreateFeedDTO,
  ) {
    const feed = await this.feedService.createChildFeed(feedId, userId, body.subGoalId, body.content, body.image);
    return {
      success: true,
      data: feed,
    };
  }

  @Get()
  public async getFeeds(
    @Query("category") category: string = "all",
    @Query("startFeedId", new ParseIntPipe({ optional: true })) startFeedId: number,
  ) {
    const feeds = await this.feedService.getFeeds(category, startFeedId);
    return {
      success: true,
      data: feeds,
    };
  }

  @Get(":feed_id")
  public async getFeed(
    @Param("feed_id") feedId: number,
  ) {
    const feed = await this.feedService.getFeed(feedId);
    return {
      success: true,
      data: feed,
    };
  }

  @Patch(":feed_id/likes")
  public async likeFeeds(
    @UserAuth() userId: number,
    @Param("feed_id") feedId: number,
  ) {
    const likes = await this.feedService.toggleLikeFeed(feedId, userId);
    return {
      success: true,
      data: likes,
    };
  }

  @Delete(":feed_id")
  public async deleteFeed(
    @UserAuth() userId: number,
    @Param("feed_id") feedId: number,
  ) {
    const result = await this.feedService.deleteFeed(feedId, userId);
    return {
      success: result,
    };
  }
}
