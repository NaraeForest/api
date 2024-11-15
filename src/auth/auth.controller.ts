import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  Request,
  Response,
} from "express";
import {
  AuthGuard,
  UserAuth,
} from "./auth.guard";
import {
  AuthService,
} from "./auth.service";

@ApiTags("Auth")
@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: "로그아웃", description: "사용자가 로그아웃 됩니다." })
  @UseGuards(AuthGuard)
  @Post("logout")
  public async logout(
    @Req() req: Request,
    @Res() res: Response,
    @UserAuth() userId: number,
  ) {
    const refreshToken = req.cookies["refresh-token"];
    await this.authService.revokeToken(userId, refreshToken);
    return res
      .clearCookie("access-token")
      .clearCookie("refresh-token")
      .json({ message: "Logout successfuly" });
  }
}
