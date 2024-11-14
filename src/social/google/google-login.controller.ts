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
  GoogleLoginService,
} from "./google-login.service";
import {
  AuthService,
} from "src/auth/auth.service";
import {
  ConfigService,
} from "@nestjs/config";

@Controller()
export class GoogleLoginController {

  constructor(
    private readonly loginService: GoogleLoginService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  @Get("callback")
  public async getLoginRedirect(
    @Query("state") state: string,
    @Query("code") code: string,
    @Query("scope") scope: string,
    @Query("authuser") authUser: string,
    @Query("prompt") prompt: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (req.csrfToken() !== state) {
      return res.status(HttpStatus.FORBIDDEN).json({ error: "Invalid csrf token" });
    }
    const token = await this.loginService.requestAccessToken(code);
    const profile = await this.loginService.requestProfile(token.accessToken);
    console.log(profile);
    let user = await this.loginService.findOneBySocialId(profile.id);
    if (user == null) {
      user = await this.loginService.createUser(profile.name, profile.picture, profile.id);
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
