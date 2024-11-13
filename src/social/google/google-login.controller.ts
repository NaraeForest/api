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

@Controller()
export class GoogleLoginController {

  constructor(
    private readonly loginService: GoogleLoginService,
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
    return res.status(200).json("work")
  }
}
