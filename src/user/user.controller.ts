import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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

@Controller()
export class UserController {

  constructor(
    private readonly userService: UserService,
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
      success: result
    }
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
}
