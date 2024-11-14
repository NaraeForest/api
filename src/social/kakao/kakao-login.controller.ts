import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import {
  Request,
  Response,
} from "express";
import {
  KakaoLoginService,
} from "./kakao-login.service";
import {
  AuthService,
} from "src/auth/auth.service";
import {
  ConfigService,
} from "@nestjs/config";

@Controller()
export class KakaoLoginController {

  constructor(
    private readonly loginService: KakaoLoginService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  @Get("callback")
  public async getLoginRedirect(
    @Query("state") state: string,
    @Query("code") code: string,
    @Query("error") error: string,
    @Query("error_description") errorDescription: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (req.csrfToken() !== state) {
      return res.status(HttpStatus.FORBIDDEN).json({ error: "Invalid csrf token" });
    }
    if (error != null) {
      console.error(error, errorDescription);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" })
    }
    const token = await this.loginService.requestAccessToken(code);
    const profile = await this.loginService.requestProfile(token.accessToken);
    let user = await this.loginService.findOneBySocialId(profile.id);
    if (user == null) {
      user = await this.loginService.createUser(profile.properties.nickname, profile.properties.profileImage, profile.id);
    }
    const accessToken = await this.authService.issueAccessToken(user);
    const accessTokenExpireDate = this.authService.getExpireDate(accessToken);
    const refreshToken = await this.authService.issueRefreshToken(user);
    const refreshTokenExpireDate = this.authService.getExpireDate(refreshToken);
    return res
      .cookie("access-token", accessToken, { expires: accessTokenExpireDate, httpOnly: true })
      .cookie("refresh-token", refreshToken, { expires: refreshTokenExpireDate, httpOnly: true })
      .redirect(this.configService.getOrThrow("jwt.loginRedirectURL"));
  }
}
