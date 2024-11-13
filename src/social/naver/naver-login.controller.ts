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

@Controller()
export class NaverLoginController {

  constructor(
    private readonly loginService: NaverLoginService,
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    const token = await this.loginService.requestAccessToken(code, state);
    const profile = await this.loginService.requestProfile(token.accessToken);
    console.log(profile);
    return res.status(200).json({ work: "helo" })
  }
}
