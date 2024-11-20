import {
  Controller,
  HttpStatus,
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
import {
  UserService,
} from "src/user/user.service";
import {
  JwtPayload,
} from "jsonwebtoken";

@ApiTags("Auth")
@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
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
      .json({ success: true });
  }

  @Post("reissue")
  public async reissueAccessToken(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const refreshToken = req.cookies["refresh-token"];
      const payload = this.authService.verifyRefreshToken(refreshToken) as JwtPayload;
      const user = await this.userService.getUserInfo(parseInt(payload.sub, 10));
      const accessToken = await this.authService.issueAccessToken(user);
      const accessTokenExpireDate = this.authService.getExpireDate(accessToken);
      return res
        .cookie("access-token", accessToken, { expires: accessTokenExpireDate, httpOnly: true })
        .json({ success: true });
    } catch (e) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false });
    }
  }
}
