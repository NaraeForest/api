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

@Controller()
export class KakaoLoginController {

  constructor(
    private readonly loginService: KakaoLoginService,
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
    console.log(profile);
    return res.status(200).json("work")
  }
}
