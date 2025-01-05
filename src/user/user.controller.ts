import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  UserService,
} from "./user.service";
import {
  AuthGuard,
  UserAuth,
} from "src/auth/auth.guard";
import {
  UpdateProfileDTO,
} from "./dto";
import {
  FeedService,
} from "src/feed/feed.service";
import {
  GoalService,
} from "src/goal/goal.service";

@Controller()
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly feedService: FeedService,
    private readonly goalService: GoalService,
  ) { }

  @UseGuards(AuthGuard)
  @Get()
  public async getProfile(
    @UserAuth() userId: number,
  ) {
    const user = await this.userService.getUserInfo(userId);
    return {
      success: true,
      data: user,
    };
  }

  @UseGuards(AuthGuard)
  @Patch()
  public async updateProfile(
    @UserAuth() userId: number,
    @Body() body: UpdateProfileDTO,
  ) {
    const result = await this.userService.updateProfile(userId, body.nickname, body.bio, body.profileImage, body.headerImage);
    return {
      success: result,
    };
  }

  @Get(":user_id")
  public async getUserProfile(
    @Param("user_id", new ParseIntPipe()) userId: number,
  ) {
    const user = await this.userService.getUserProfile(userId);
    return {
      success: true,
      data: user,
    };
  }

  @Get(":user_id/feeds")
  public async getMyFeeds(
    @Param("user_id", new ParseIntPipe()) userId: number,
    @Query("startFeedId", new ParseIntPipe({ optional: true })) startFeedId: number,
  ) {
    const feeds = await this.feedService.getUserFeeds(userId, startFeedId);
    return {
      success: true,
      data: feeds,
    };
  }

  @Get(":user_id/goals")
  public async getUserGoals(
    @Param("user_id", new ParseIntPipe()) userId: number,
  ) {
    const goals = await this.goalService.getUserGoals(userId);
    return {
      success: true,
      data: goals,
    };
  }
}
