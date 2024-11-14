import Configuration from './config/configuration';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes("*");
  }
}
