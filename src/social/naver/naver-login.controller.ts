import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import {
  NaverLoginService,
} from "./naver-login.service";
import {
  Request,
  Response,
} from "express";
import {
  ConfigService,
} from "@nestjs/config";
import {
  AuthService,
} from "src/auth/auth.service";
import {
  S3Service,
} from "src/s3/s3.service";

@Controller()
export class NaverLoginController {

  constructor(
    private readonly loginService: NaverLoginService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
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
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ error: "Invalid csrf token" });
    }
    if (error != null) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal server error" });
    }
    const token = await this.loginService.requestAccessToken(code, state);
    const profile = await this.loginService.requestProfile(token.accessToken);
    const profileImage = await this.loginService.getProfileImage(profile.response.profileImage);
    const key = this.s3Service.generateKey(profile.response.profileImage.split(".").pop() || "blob");
    profile.response.profileImage = await this.s3Service.upload(key, profileImage);
    let user = await this.loginService.findOneBySocialId(profile.response.id);
    if (user == null) {
      user = await this.loginService.createUser(profile.response.nickname, profile.response.profileImage, profile.response.id);
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
