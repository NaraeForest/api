import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import {
  JwtService,
} from "@nestjs/jwt";
import {
  NextFunction,
  Request,
  Response,
} from "express";

@Injectable()
export class JwtMiddleware implements NestMiddleware {

  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies["access-token"] as string;
    if (token == null) {
      return next();
    }
    try {
      const decode = await this.jwtService.verifyAsync(token);
      req["sub"] = decode.sub;
      next();
    } catch (e) {
      throw new HttpException("Token is invalid", HttpStatus.UNAUTHORIZED);
    }
  }
}
