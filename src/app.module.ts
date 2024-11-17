import Configuration from './config/configuration';
import {
  HttpStatus,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import {
  ReadOnlyDataSource,
  WritableDataSource,
} from './config/database';
import {
  RegisteredModules,
  Routes,
} from './router.module';
import {
  JwtMiddleware,
} from './auth/auth.middleware';
import {
  AuthFactory,
} from './auth/auth.module';
import {
  TerminusModule,
} from '@nestjs/terminus';
import {
  ConfigService,
} from '@nestjs/config';
import {
  doubleCsrf,
} from 'csrf-csrf';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

@Module({
  imports: [
    Configuration,
    WritableDataSource,
    ReadOnlyDataSource,
    Routes,
    AuthFactory,
    ...RegisteredModules,
    TerminusModule.forRoot({
      /**
       * kubernetes의 gracefull shutdown 시간과 동일하게 설정
       */
      gracefulShutdownTimeoutMs: 30000,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  constructor(
    private readonly configService: ConfigService,
  ) { }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes("*");
    const {
      invalidCsrfTokenError,
      doubleCsrfProtection,
    } = doubleCsrf({
      getSecret: () => this.configService.getOrThrow("csrfSecret"),
      cookieName: "x-csrf-token",
      cookieOptions: {
        sameSite: "lax",
        path: "/",
        secure: this.configService.get("isProduction"),
      },
      size: 64,
      getTokenFromRequest: (req) => req.headers["x-csrf-token"],
    });
    const csrfErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
      if (error === invalidCsrfTokenError) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ error: "Invalid csrf token" });
      }
      next();
    };
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        try {
          doubleCsrfProtection(req, res, next);
        } catch (e) {
          csrfErrorMiddleware(e, req, res, next);
        }
      })
      .forRoutes(
        { path: "api/csrf/*", method: RequestMethod.ALL },
        { path: "api/v1/auth/google/*", method: RequestMethod.ALL },
        { path: "api/v1/auth/naver/*", method: RequestMethod.ALL },
        { path: "api/v1/auth/kakao/*", method: RequestMethod.ALL },
      );
  }
}
