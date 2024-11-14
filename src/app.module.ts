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

@Module({
  imports: [
    Configuration,
    WritableDataSource,
    ReadOnlyDataSource,
    Routes,
    AuthFactory,
    ...RegisteredModules,
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
