import {
  Module,
} from "@nestjs/common";
import {
  TypeOrmModule,
} from "@nestjs/typeorm";
import {
  AuthController,
} from "./auth.controller";
import {
  AuthService,
} from "./auth.service";
import {
  Auth,
  User,
} from "src/entities";
import {
  JwtModule,
} from "@nestjs/jwt";
import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";

export const AuthFactory = JwtModule.registerAsync({
  imports: [
    ConfigModule,
  ],
  inject: [
    ConfigService,
  ],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.getOrThrow("jwt.accessTokenSecret"),
    signOptions: {
      expiresIn: "1h",
    },
  }),
});

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Auth], "writable"),
    AuthFactory,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule { }

