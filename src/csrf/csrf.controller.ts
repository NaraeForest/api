import {
  Controller,
  Get,
  Req,
  Res,
} from "@nestjs/common";
import {
  Request,
  Response,
} from "express";

@Controller()
export class CSRFController {

  @Get("token")
  public getCSRFToken(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const token = req.csrfToken();
    return res.json({
      success: true,
      token,
    });
  }
}
